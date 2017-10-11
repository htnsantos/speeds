import { SpeedsAdminPage } from './app.po';

describe('speeds-admin App', () => {
  let page: SpeedsAdminPage;

  beforeEach(() => {
    page = new SpeedsAdminPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
