import { TheShopPage } from './app.po';

describe('the-shop App', () => {
  let page: TheShopPage;

  beforeEach(() => {
    page = new TheShopPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
