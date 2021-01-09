const { device, expect, element, by } = require('detox');

const TEXT_IN_SCREENS = {
  zero: '0 - Go to last index',
  one: '1 - Press to get the previous index',
  two: '2 - Press to get the current index',
  three: '3 - Go to the second index',
  fourth: '4 - Go to first index',
};
const SCREENS = {
  zero: 'container_swiper_screen_0',
  one: 'container_swiper_screen_1',
  two: 'container_swiper_screen_2',
  three: 'container_swiper_screen_3',
  fourth: 'container_swiper_screen_4',
};
const PAGINATION = {
  zero: 'container_swiper_pagination_0',
  one: 'container_swiper_pagination_1',
  two: 'container_swiper_pagination_2',
  three: 'container_swiper_pagination_3',
  fourth: 'container_swiper_pagination_4',
};

describe('example with children', () => {
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
    await element(by.id('container_swiper')).swipe('left');

    await element(by.id('container_swiper')).swipe('right');
    await element(by.id('container_swiper')).swipe('right');
    await element(by.id('container_swiper')).swipe('right');
    await element(by.id('container_swiper')).swipe('right');
    await element(by.id('container_swiper')).swipe('right');
  });

  it('should tap pagination', async () => {
    await element(by.id(PAGINATION.zero)).tap();
    await expect(element(by.text(TEXT_IN_SCREENS.zero))).toBeVisible();

    await element(by.id(PAGINATION.one)).tap();
    await expect(element(by.text(TEXT_IN_SCREENS.one))).toBeVisible();

    await element(by.id(PAGINATION.two)).tap();
    await expect(element(by.text(TEXT_IN_SCREENS.two))).toBeVisible();

    await element(by.id(PAGINATION.three)).tap();
    await expect(element(by.text(TEXT_IN_SCREENS.three))).toBeVisible();

    await element(by.id(PAGINATION.fourth)).tap();
    await expect(element(by.text(TEXT_IN_SCREENS.fourth))).toBeVisible();
  });

  it('should tap screen 0 - goToLastIndex', async () => {
    await element(by.id(PAGINATION.zero)).tap();
    await element(by.id(SCREENS.zero)).tap();
    await expect(element(by.text(TEXT_IN_SCREENS.fourth))).toBeVisible();
  });
  it('should tap screen 1 - getPrevIndex', async () => {
    // getPrevIndex 0
    await element(by.id(PAGINATION.one)).tap();
    await element(by.id(SCREENS.one)).tap();
    await expect(element(by.text('the previous index is 0'))).toBeVisible();
    await element(by.label('OK')).atIndex(0).tap();
    await expect(element(by.text(TEXT_IN_SCREENS.one))).toBeVisible();

    // getPrevIndex 2
    await element(by.id(PAGINATION.two)).tap();
    await element(by.id(PAGINATION.one)).tap();
    await element(by.id(SCREENS.one)).tap();
    await expect(element(by.text('the previous index is 2'))).toBeVisible();
    await element(by.label('OK')).atIndex(0).tap();
    await expect(element(by.text(TEXT_IN_SCREENS.one))).toBeVisible();

    // getPrevIndex 3
    await element(by.id(PAGINATION.three)).tap();
    await element(by.id(PAGINATION.one)).tap();
    await element(by.id(SCREENS.one)).tap();
    await expect(element(by.text('the previous index is 3'))).toBeVisible();
    await element(by.label('OK')).atIndex(0).tap();
    await expect(element(by.text(TEXT_IN_SCREENS.one))).toBeVisible();

    // getPrevIndex 4
    await element(by.id(PAGINATION.fourth)).tap();
    await element(by.id(PAGINATION.one)).tap();
    await element(by.id(SCREENS.one)).tap();
    await expect(element(by.text('the previous index is 4'))).toBeVisible();
    await element(by.label('OK')).atIndex(0).tap();
    await expect(element(by.text(TEXT_IN_SCREENS.one))).toBeVisible();
  });

  it('should tap screen 2 - getCurrentIndex', async () => {
    await element(by.id(PAGINATION.two)).tap();
    await element(by.id(SCREENS.two)).tap();
    await expect(element(by.text('the current index is 2'))).toBeVisible();
    await element(by.label('OK')).atIndex(0).tap();
    await expect(element(by.text(TEXT_IN_SCREENS.two))).toBeVisible();
  });

  it('should tap screen 3 - scrollToIndex', async () => {
    await element(by.id(PAGINATION.three)).tap();
    await element(by.id(SCREENS.three)).tap();
    await expect(element(by.text(TEXT_IN_SCREENS.one))).toBeVisible();
  });

  it('should tap screen 4 - goToFirstIndex', async () => {
    await element(by.id(PAGINATION.fourth)).tap();
    await element(by.id(SCREENS.fourth)).tap();
    await expect(element(by.text(TEXT_IN_SCREENS.zero))).toBeVisible();
  });

  // https://github.com/wix/Detox/blob/master/docs/APIRef.ActionsOnElement.md#swipedirection-speed-percentage
});
