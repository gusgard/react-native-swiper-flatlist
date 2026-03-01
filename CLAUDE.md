# CLAUDE.md

## Project Overview

**react-native-swiper-flatlist** is a React Native carousel/swiper component built on top of `FlatList`. It supports iOS, Android, and Web (via react-native-web), with features including autoplay, pagination, gesture handling, RTL support, and imperative navigation via refs.

- **Version**: 3.2.5
- **License**: Apache-2.0
- **Package manager**: Yarn 3.5.0
- **Entry point**: `index.ts`

## Repository Structure

```
├── index.ts                  # Main entry — exports SwiperFlatList, Pagination, and types
├── WithGestureHandler.tsx    # SwiperFlatListWithGestureHandler (react-native-gesture-handler variant)
├── src/
│   ├── components/
│   │   ├── SwiperFlatList/
│   │   │   ├── SwiperFlatList.tsx        # Main component implementation
│   │   │   ├── SwiperFlatListProps.tsx   # Props type definitions
│   │   │   ├── SwiperFlatList.web.ts     # Web platform variant
│   │   │   └── test.tsx                  # Unit tests
│   │   ├── Pagination/
│   │   │   ├── Pagination.tsx            # Pagination dots component
│   │   │   ├── PaginationProps.tsx       # Pagination type definitions
│   │   │   └── test.tsx                  # Unit tests
│   │   └── index.ts                      # Component barrel exports
│   └── themes/
│       ├── colors.ts                     # Color constants (white, gray)
│       └── layout.ts                     # Responsive spacing utilities
├── example/                  # Expo example app (SDK 48, RN 0.71.6)
│   ├── src/                  # Example components demonstrating usage
│   └── e2e/                  # Detox E2E tests
└── old-rn-example/           # Legacy React Native example (not actively maintained)
```

## Commands

### Full validation (matches pre-commit hook)
```sh
yarn lint-and-test       # Runs: yarn tsc && yarn lint && yarn jest
```

### Individual commands
```sh
yarn tsc                 # TypeScript type checking (strict mode, noEmit)
yarn lint                # ESLint on index.ts, src/, example/scripts, example/src
yarn lint:fix            # ESLint with auto-fix
yarn test                # Jest unit tests (alias for yarn jest)
yarn test:watch          # Jest in watch mode
```

### Example app (from example/ directory)
```sh
cd example
yarn install
yarn start               # Expo dev server
yarn ios                 # Run on iOS
yarn android             # Run on Android
yarn web                 # Run on web
```

## Code Style & Conventions

### Formatting
- **Prettier**: single quotes, 100-char print width, trailing commas
- **ESLint**: extends `@react-native-community`, inline styles allowed
- **Indentation**: 2 spaces
- **Line endings**: LF

### TypeScript
- Strict mode enabled (`strict: true`)
- JSX mode: `react-native`
- Target: `esnext`, module resolution: `node`
- No emit — TypeScript is used for type checking only; Babel handles transpilation

### File naming
- Components use PascalCase directories: `SwiperFlatList/`, `Pagination/`
- Props are in separate `*Props.tsx` files alongside the component
- Tests are co-located as `test.tsx` within each component directory
- Web platform variants use `.web.ts` extension

### Architecture patterns
- Functional component with `React.forwardRef` and `useImperativeHandle` for ref API
- `useRef`, `useState`, `useEffect`, `useCallback` hooks throughout
- Platform-specific files (`.web.ts`) for web compatibility
- Viewability-based index tracking (60% visibility threshold)

## Testing

- **Framework**: Jest 24.8.0 with `react-native` preset
- **Library**: react-native-testing-library 1.11.1
- **Snapshot tests**: committed in `__snapshots__/` directories
- **E2E tests**: Detox (in `example/e2e/`), run via Bitrise CI
- Test files are at `src/components/*/test.tsx`
- Ignored paths: `example/`, `old-rn-example/`

When updating snapshots after intentional visual changes:
```sh
yarn jest --updateSnapshot
```

## CI

### GitHub Actions (`.github/workflows/node.js.yml`)
- Triggers on push to `master` and PRs targeting `master`
- Matrix: Node 20.x and 22.x
- Enables corepack for Yarn 3 (Berry) support
- Steps: `corepack enable` → `yarn install` → `yarn tsc` → `yarn lint` → `yarn jest`

### Pre-commit hook
- Configured via `pre-commit` package in package.json
- Runs `lint-and-test` (tsc + lint + jest) before every commit

## Public API

### Exports from `index.ts`
- `SwiperFlatList` (default export + named export) — main component
- `Pagination` — pagination dots component (for custom use)
- `SwiperFlatListProps` — type export
- `PaginationProps` — type export

### Exports from `WithGestureHandler.tsx`
- `SwiperFlatListWithGestureHandler` — variant using react-native-gesture-handler

### Ref methods (`SwiperFlatListRefProps`)
- `getCurrentIndex()` / `getPrevIndex()` — read current/previous index
- `scrollToIndex({index, animated?})` — navigate to a specific slide
- `goToFirstIndex()` / `goToLastIndex()` — jump to first/last slide

## Key Implementation Notes

- The component wraps React Native's `FlatList` with `pagingEnabled` and horizontal scrolling
- Index changes are detected via `onViewableItemsChanged` with a 60% visibility threshold
- Autoplay uses `setInterval` with configurable delay, loop, and direction
- RTL support uses `I18nManager.isRTL` for directional calculations
- The `disableGesture` prop works by overlaying a `View` with `onTouchStart`/`onTouchEnd` that captures gestures
- `renderAll` prop controls whether `windowSize` is set to render all items upfront or use default windowing
- Peer dependency: `react-native >= 0.59.0`

## Pre-completion Checklist

Before considering any work done, **always** complete the following steps:

- [ ] Run `yarn install` to ensure all dependencies are up to date
- [ ] Run `yarn lint` (or `yarn lint:fix`) to verify there are no linting errors
- [ ] Run `yarn tsc` to verify there are no TypeScript errors
- [ ] Run `yarn test` to verify all unit tests pass
- [ ] If snapshots changed intentionally, run `yarn jest --updateSnapshot`
