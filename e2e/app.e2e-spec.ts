import { FoobarbazPage } from './app.po';

describe('foobarbaz-frontend-v2 App', function() {
  let page: FoobarbazPage;

  beforeEach(() => {
    page = new FoobarbazPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
