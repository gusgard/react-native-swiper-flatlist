const { device, expect, element, by } = require('detox');

// const TEXT_IN_SCREENS = {
//   ZERO: 'Item at index 0',
//   ONE: 'Item at index 1',
//   TWO: 'Item at index 2',
//   THREE: 'Item at index 3',
//   FOURTH: 'Item at index 4',
// };
const SCREENS = {
  ZERO: 'container_swiper_renderItem_screen_0',
  ONE: 'container_swiper_renderItem_screen_1',
  TWO: 'container_swiper_renderItem_screen_2',
  THREE: 'container_swiper_renderItem_screen_3',
  FOURTH: 'container_swiper_renderItem_screen_4',
};
// const PAGINATION = {
//   ZERO: 'container_swiper_renderItem_pagination_0',
//   ONE: 'container_swiper_renderItem_pagination_1',
//   TWO: 'container_swiper_renderItem_pagination_2',
//   THREE: 'container_swiper_renderItem_pagination_3',
//   FOURTH: 'container_swiper_renderItem_pagination_4',
// };

const DELAY = 2 * 1000;

describe('example with renderItems and data', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
    // TODO: add menu with more steps!
    // await element(by.id('renderItem')).tap();
  });

  it('should see screen', async () => {
    await expect(element(by.id('container_swiper_renderItem'))).toBeVisible();
  });

  it('should execute autoplay every 2.0s', async () => {
    // Initial with first swiper
    await expect(element(by.id(SCREENS.ZERO))).toBeVisible();
    await expect(element(by.id(SCREENS.ONE))).toBeNotVisible();
    await expect(element(by.id(SCREENS.TWO))).toBeNotVisible();
    await expect(element(by.id(SCREENS.THREE))).toBeNotVisible();
    await expect(element(by.id(SCREENS.FOURTH))).toBeNotVisible();

    // after 3s => second swiper
    await new Promise((_) => setTimeout(_, DELAY));

    await expect(element(by.id(SCREENS.ZERO))).toBeNotVisible();
    await expect(element(by.id(SCREENS.ONE))).toBeVisible();
    await expect(element(by.id(SCREENS.TWO))).toBeNotVisible();
    await expect(element(by.id(SCREENS.THREE))).toBeNotVisible();
    await expect(element(by.id(SCREENS.FOURTH))).toBeNotVisible();

    // after 6s => third swiper
    await new Promise((_) => setTimeout(_, DELAY));

    await expect(element(by.id(SCREENS.ZERO))).toBeNotVisible();
    await expect(element(by.id(SCREENS.ONE))).toBeNotVisible();
    await expect(element(by.id(SCREENS.TWO))).toBeVisible();
    await expect(element(by.id(SCREENS.THREE))).toBeNotVisible();
    await expect(element(by.id(SCREENS.FOURTH))).toBeNotVisible();

    // after 9s => fourh swiper
    await new Promise((_) => setTimeout(_, DELAY));

    await expect(element(by.id(SCREENS.ZERO))).toBeNotVisible();
    await expect(element(by.id(SCREENS.ONE))).toBeNotVisible();
    await expect(element(by.id(SCREENS.TWO))).toBeNotVisible();
    await expect(element(by.id(SCREENS.THREE))).toBeVisible();
    await expect(element(by.id(SCREENS.FOURTH))).toBeNotVisible();

    // after 9s => five swiper
    await new Promise((_) => setTimeout(_, DELAY));

    await expect(element(by.id(SCREENS.ZERO))).toBeNotVisible();
    await expect(element(by.id(SCREENS.ONE))).toBeNotVisible();
    await expect(element(by.id(SCREENS.TWO))).toBeNotVisible();
    await expect(element(by.id(SCREENS.THREE))).toBeNotVisible();
    await expect(element(by.id(SCREENS.FOURTH))).toBeVisible();
  });

  // https://github.com/wix/Detox/blob/master/docs/APIRef.ActionsOnElement.md#swipedirection-speed-percentage
});
