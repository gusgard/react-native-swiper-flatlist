describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  // it('should show world screen after tap', async () => {
  //   await element(by.id('world_button')).tap();
  //   await expect(element(by.text('World!!!'))).toBeVisible();
  // });

  it('should swipe screens', async () => {
    await element(by.id('containerSwiper')).swipe('left');
    await element(by.id('containerSwiper')).swipe('left');
    await element(by.id('containerSwiper')).swipe('left');
  });

  // https://github.com/wix/Detox/blob/master/docs/APIRef.ActionsOnElement.md#swipedirection-speed-percentage
});
