const { device, expect, element, by, waitFor } = require('detox');

// const TEXT_IN_SCREENS = {
//   zero: 'Item at index 0',
//   one: 'Item at index 1',
//   two: 'Item at index 2',
//   three: 'Item at index 3',
//   fourth: 'Item at index 4',
// };
const SCREENS = {
  zero: 'container_swiper_renderItem_screen_0',
  one: 'container_swiper_renderItem_screen_1',
  two: 'container_swiper_renderItem_screen_2',
  three: 'container_swiper_renderItem_screen_3',
  fourth: 'container_swiper_renderItem_screen_4',
};
// const PAGINATION = {
//   zero: 'container_swiper_renderItem_pagination_0',
//   one: 'container_swiper_renderItem_pagination_1',
//   two: 'container_swiper_renderItem_pagination_2',
//   three: 'container_swiper_renderItem_pagination_3',
//   fourth: 'container_swiper_renderItem_pagination_4',
// };

const DELAY = 2 * 1000;

describe('example with renderItems and data', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
    // TODO: add menu with steps!
    // await element(by.id('renderItem')).tap();
  });

  it('should see screen', async () => {
    await expect(element(by.id('container_swiper_renderItem'))).toBeVisible();
  });

  it('should execute autoplay every 2.0s', async () => {
    // 0s => screen with zero
    await expect(element(by.id(SCREENS.zero))).toBeVisible();
    await waitFor(element(by.id(SCREENS.zero)))
      .toBeVisible()
      .withTimeout(DELAY);

    // await expect(element(by.id(SCREENS.one))).toBeNotVisible();
    // await expect(element(by.id(SCREENS.two))).toBeNotVisible();
    // await expect(element(by.id(SCREENS.three))).toBeNotVisible();
    // await expect(element(by.id(SCREENS.fourth))).toBeNotVisible();

    // after 2s => screen with one
    await new Promise((_) => setTimeout(_, DELAY / 2));
    await waitFor(element(by.id(SCREENS.one)))
      .toBeVisible()
      .withTimeout(DELAY);

    // await expect(element(by.id(SCREENS.zero))).toBeNotVisible();
    // await expect(element(by.id(SCREENS.two))).toBeNotVisible();
    // await expect(element(by.id(SCREENS.three))).toBeNotVisible();
    // await expect(element(by.id(SCREENS.fourth))).toBeNotVisible();

    // after 4s => screen with two
    await new Promise((_) => setTimeout(_, DELAY / 2));
    await waitFor(element(by.id(SCREENS.two)))
      .toBeVisible()
      .withTimeout(DELAY);

    // await expect(element(by.id(SCREENS.zero))).toBeNotVisible();
    // await expect(element(by.id(SCREENS.one))).toBeNotVisible();
    // await expect(element(by.id(SCREENS.three))).toBeNotVisible();
    // await expect(element(by.id(SCREENS.fourth))).toBeNotVisible();

    // after 6s => screen with three
    await new Promise((_) => setTimeout(_, DELAY / 2));
    await waitFor(element(by.id(SCREENS.three)))
      .toBeVisible()
      .withTimeout(DELAY);

    // await expect(element(by.id(SCREENS.zero))).toBeNotVisible();
    // await expect(element(by.id(SCREENS.one))).toBeNotVisible();
    // await expect(element(by.id(SCREENS.two))).toBeNotVisible();
    // await expect(element(by.id(SCREENS.fourth))).toBeNotVisible();

    // after 8s => screen with fourth
    await new Promise((_) => setTimeout(_, DELAY / 2));
    await waitFor(element(by.id(SCREENS.fourth)))
      .toBeVisible()
      .withTimeout(DELAY);

    // await expect(element(by.id(SCREENS.zero))).toBeNotVisible();
    // await expect(element(by.id(SCREENS.one))).toBeNotVisible();
    // await expect(element(by.id(SCREENS.two))).toBeNotVisible();
    // await expect(element(by.id(SCREENS.three))).toBeNotVisible();
  });

  // https://github.com/wix/Detox/blob/master/docs/APIRef.ActionsOnElement.md#swipedirection-speed-percentage
});
