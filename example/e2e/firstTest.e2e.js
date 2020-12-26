const {device, expect, element, by, waitFor} = require('detox');

const TEXT_IN_SCREENS = {
  ZERO: '0 - Go to last index',
  ONE:'1 - Press to get the previous index',
  TWO:'2 - Press to get the current index',
  THREE: '3 - Go to the second index',
  FOURTH: '4 - Go to first index'
}
const SCREENS = {
  ZERO: 'container_swiper_screen_0',
  ONE:'container_swiper_screen_1',
  TWO:'container_swiper_screen_2',
  THREE:'container_swiper_screen_3',
  FOURTH:'container_swiper_screen_4',
}
const PAGINATION = {
  ZERO: 'container_swiper_pagination_0',
  ONE:'container_swiper_pagination_1',
  TWO:'container_swiper_pagination_2',
  THREE:'container_swiper_pagination_3',
  FOURTH:'container_swiper_pagination_4',
}

describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should see screen', async () => {
    await expect(element(by.id('container_swiper'))).toBeVisible();
  });

  it('should swipe screens', async () => {
    await element(by.id('container_swiper')).swipe('left');
    await element(by.id('container_swiper')).swipe('left');
    await element(by.id('container_swiper')).swipe('left');
    await element(by.id('container_swiper')).swipe('left');
  });
/*
  it('should tap pagination', async () => {
    await element(by.id(PAGINATION.ZERO)).tap();
    await expect(element(by.text(TEXT_IN_SCREENS.ZERO))).toBeVisible();

    await element(by.id(PAGINATION.ONE)).tap();
    await expect(element(by.text(TEXT_IN_SCREENS.ONE))).toBeVisible();

    await element(by.id(PAGINATION.TWO)).tap();
    await expect(element(by.text(TEXT_IN_SCREENS.TWO))).toBeVisible();

    await element(by.id(PAGINATION.THREE)).tap();
    await expect(element(by.text(TEXT_IN_SCREENS.THREE))).toBeVisible();

    await element(by.id(PAGINATION.FOURTH)).tap();
    await expect(element(by.text(TEXT_IN_SCREENS.FOURTH))).toBeVisible();
  });

  it('should tap screen 0 - goToLastIndex', async () => {
    await element(by.id(PAGINATION.ZERO)).tap();
    await element(by.id(SCREENS.ZERO)).tap();
    await expect(element(by.text(TEXT_IN_SCREENS.FOURTH))).toBeVisible();
  });
  it('should tap screen 1 - getPrevIndex', async () => {
    // getPrevIndex 0
    await element(by.id(PAGINATION.ONE)).tap();
    await element(by.id(SCREENS.ONE)).tap();
    await expect(element(by.text('the previous index is 0'))).toBeVisible();
    await element(by.label("OK")).atIndex(0).tap();
    await expect(element(by.text(TEXT_IN_SCREENS.ONE))).toBeVisible();

    // getPrevIndex 2
    await element(by.id(PAGINATION.TWO)).tap();
    await element(by.id(PAGINATION.ONE)).tap();
    await element(by.id(SCREENS.ONE)).tap();
    await expect(element(by.text('the previous index is 2'))).toBeVisible();
    await element(by.label("OK")).atIndex(0).tap();
    await expect(element(by.text(TEXT_IN_SCREENS.ONE))).toBeVisible();

    // getPrevIndex 3
    await element(by.id(PAGINATION.THREE)).tap();
    await element(by.id(PAGINATION.ONE)).tap();
    await element(by.id(SCREENS.ONE)).tap();
    await expect(element(by.text('the previous index is 3'))).toBeVisible();
    await element(by.label("OK")).atIndex(0).tap();
    await expect(element(by.text(TEXT_IN_SCREENS.ONE))).toBeVisible();

    // getPrevIndex 4
    await element(by.id(PAGINATION.FOURTH)).tap();
    await element(by.id(PAGINATION.ONE)).tap();
    await element(by.id(SCREENS.ONE)).tap();
    await expect(element(by.text('the previous index is 4'))).toBeVisible();
    await element(by.label("OK")).atIndex(0).tap();
    await expect(element(by.text(TEXT_IN_SCREENS.ONE))).toBeVisible();
  });

  it('should tap screen 2 - getCurrentIndex', async () => {
    await element(by.id(PAGINATION.TWO)).tap();
    await element(by.id(SCREENS.TWO)).tap();
    await expect(element(by.text('the current index is 2'))).toBeVisible();
    await element(by.label("OK")).atIndex(0).tap();
    await expect(element(by.text(TEXT_IN_SCREENS.TWO))).toBeVisible();
  });

  it('should tap screen 3 - scrollToIndex', async () => {
    await element(by.id(PAGINATION.THREE)).tap();
    await element(by.id(SCREENS.THREE)).tap();
    await expect(element(by.text(TEXT_IN_SCREENS.ONE))).toBeVisible();
  });

  it('should tap screen 4 - goToFirstIndex', async () => {
    await element(by.id(PAGINATION.FOURTH)).tap();
    await element(by.id(SCREENS.FOURTH)).tap();
    await expect(element(by.text(TEXT_IN_SCREENS.ZERO))).toBeVisible();
  });

  */
  // https://github.com/wix/Detox/blob/master/docs/APIRef.ActionsOnElement.md#swipedirection-speed-percentage
});
