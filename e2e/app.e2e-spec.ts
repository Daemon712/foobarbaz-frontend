import { FoobarbazFrontendV2Page } from './app.po';

describe('foobarbaz-frontend-v2 App', function() {
  let page: FoobarbazFrontendV2Page;

  beforeEach(() => {
    page = new FoobarbazFrontendV2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
