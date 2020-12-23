const {device, expect, element, by, waitFor} = require('detox');

describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should see screen', async () => {
    await expect(element(by.id('containerSwiper'))).toBeVisible();
  });
  it('should swipe screens', async () => {
    await element(by.id('containerSwiper')).swipe('left');
    await element(by.id('containerSwiper')).swipe('left');
    await element(by.id('containerSwiper')).swipe('left');
  });

  // only works with start:watch
  // it('should tap pagination', async () => {
  //   await element(by.id('containerSwiper_pagination_0')).tap();
  //   await expect(element(by.text('0 - Go to last index'))).toBeVisible();

  //   await element(by.id('containerSwiper_pagination_1')).tap();
  //   await expect(element(by.text('1 - Press to get the previous index'))).toBeVisible();

  //   await element(by.id('containerSwiper_pagination_2')).tap();
  //   await expect(element(by.text('2 - Press to get the current index'))).toBeVisible();

  //   await element(by.id('containerSwiper_pagination_3')).tap();
  //   await expect(element(by.text('3 - Go to the second index'))).toBeVisible();

  //   await element(by.id('containerSwiper_pagination_4')).tap();
  //   await expect(element(by.text('4 - Go to first index'))).toBeVisible();

  //   // await element(by.id('containerSwiper')).tap();

  // });

  // https://github.com/wix/Detox/blob/master/docs/APIRef.ActionsOnElement.md#swipedirection-speed-percentage
});
