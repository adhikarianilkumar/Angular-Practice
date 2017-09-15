import { AngularPracticePage } from './app.po';

describe('angular-practice App', () => {
  let page: AngularPracticePage;

  beforeEach(() => {
    page = new AngularPracticePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
