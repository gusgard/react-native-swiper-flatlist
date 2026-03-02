#!/usr/bin/env bash
#
# Posts Detox E2E test failure output as a GitHub PR comment.
#
# Required environment variables:
#   GITHUB_TOKEN          - GitHub personal access token with repo/PR comment permissions
#   BITRISE_PULL_REQUEST  - PR number (set automatically by Bitrise for PR builds)
#   GIT_REPOSITORY_URL    - Git repo URL (set automatically by Bitrise)
#
# Optional environment variables:
#   BITRISE_GIT_COMMIT    - Commit SHA (set automatically by Bitrise)
#   BITRISE_BUILD_URL     - Link to the Bitrise build (set automatically by Bitrise)
#
# Usage:
#   pnpm detox test ... 2>&1 | tee /tmp/detox-output.log
#   # If tests failed:
#   ./scripts/report-detox-failures.sh /tmp/detox-output.log

set -o pipefail

# --- Verify required tools ---
if ! command -v jq &>/dev/null; then
  echo "Error: 'jq' is required but not found in PATH. Install it with: brew install jq"
  exit 1
fi

LOG_FILE="${1:?Usage: report-detox-failures.sh <log-file>}"

if [ ! -f "$LOG_FILE" ]; then
  echo "Error: Log file not found: $LOG_FILE"
  exit 1
fi

# --- Guard: only run for PR builds with a token ---
if [ -z "$BITRISE_PULL_REQUEST" ]; then
  echo "Not a PR build (BITRISE_PULL_REQUEST is empty). Skipping PR comment."
  exit 0
fi

if [ -z "$GITHUB_TOKEN" ]; then
  echo "Warning: GITHUB_TOKEN is not set. Cannot post PR comment."
  exit 0
fi

# --- Parse owner/repo from GIT_REPOSITORY_URL ---
# Handles both SSH (git@github.com:owner/repo.git) and HTTPS (https://github.com/owner/repo.git)
REPO_SLUG=""
if [[ "$GIT_REPOSITORY_URL" =~ github\.com[:/]([^/]+/[^/.]+)(\.git)?$ ]]; then
  REPO_SLUG="${BASH_REMATCH[1]}"
fi

if [ -z "$REPO_SLUG" ]; then
  echo "Error: Could not parse owner/repo from GIT_REPOSITORY_URL: $GIT_REPOSITORY_URL"
  exit 1
fi

PR_NUMBER="$BITRISE_PULL_REQUEST"
COMMIT_SHA="${BITRISE_GIT_COMMIT:-unknown}"
BUILD_URL="${BITRISE_BUILD_URL:-}"

# --- Truncate log if too large (GitHub comment limit is 65536 chars) ---
MAX_LOG_CHARS=50000
LOG_CONTENT=$(cat "$LOG_FILE")
if [ ${#LOG_CONTENT} -gt $MAX_LOG_CHARS ]; then
  LOG_CONTENT="${LOG_CONTENT:0:$MAX_LOG_CHARS}

... (truncated — full output available in Bitrise build logs)"
fi

# --- Build comment body ---
BUILD_LINK=""
if [ -n "$BUILD_URL" ]; then
  BUILD_LINK="**Build:** $BUILD_URL"
fi

BODY=$(cat <<COMMENT_EOF
## Detox E2E Test Failures

**Configuration:** \`ios.sim.release\`
**Commit:** \`${COMMIT_SHA}\`
${BUILD_LINK}

### Test Output

\`\`\`
${LOG_CONTENT}
\`\`\`

### Relevant Source Files

E2E test files:
- \`example/e2e/firstTest.e2e.test.js\`
- \`example/e2e/renderItems.e2e.test.js\`

Component source files:
- \`src/components/SwiperFlatList/SwiperFlatList.tsx\`
- \`src/components/SwiperFlatList/SwiperFlatListProps.tsx\`
- \`src/components/Pagination/Pagination.tsx\`

Example app source (test IDs and screen setup):
- \`example/src/\`
COMMENT_EOF
)

# Encode the full body as JSON
BODY_JSON=$(printf '%s\n' "$BODY" | jq -Rs .)

# --- Post comment to PR ---
GITHUB_API_URL="https://api.github.com/repos/${REPO_SLUG}/issues/${PR_NUMBER}/comments"

echo "Posting Detox failure report to PR #${PR_NUMBER} on ${REPO_SLUG}..."

HTTP_STATUS=$(printf '{"body": %s}' "$BODY_JSON" | curl -s -o /tmp/gh-comment-response.json -w "%{http_code}" \
  -X POST \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Content-Type: application/json" \
  --data-binary @- \
  "$GITHUB_API_URL")

if [ "$HTTP_STATUS" -ge 200 ] && [ "$HTTP_STATUS" -lt 300 ]; then
  COMMENT_URL=$(jq -r '.html_url' /tmp/gh-comment-response.json)
  echo "Successfully posted PR comment: $COMMENT_URL"
else
  echo "Failed to post PR comment. HTTP status: $HTTP_STATUS"
  cat /tmp/gh-comment-response.json
  exit 1
fi
