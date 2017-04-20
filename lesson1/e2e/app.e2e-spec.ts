import { Lesson1Page } from './app.po';

describe('lesson1 App', () => {
  let page: Lesson1Page;

  beforeEach(() => {
    page = new Lesson1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
