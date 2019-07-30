const config = require('../package.json').detox;
describe('Example', () => {
  beforeEach(async () => {
    if (typeof device == 'undefined') {
      await detox.init(config);
    }
    await device.reloadReactNative();
  });

  // it('should show world screen after tap', async () => {
  //   await element(by.id('world_button')).tap();
  //   await expect(element(by.text('World!!!'))).toBeVisible();
  // });

  it('should see screen', async () => {
    await expect(element(by.id('containerSwiper'))).toBeVisible();
  });
  it('should swipe screens', async () => {
    await element(by.id('containerSwiper')).swipe('left');
    await element(by.id('containerSwiper')).swipe('left');
    await element(by.id('containerSwiper')).swipe('left');
  });

  // https://github.com/wix/Detox/blob/master/docs/APIRef.ActionsOnElement.md#swipedirection-speed-percentage
});
