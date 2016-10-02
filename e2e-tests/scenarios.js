'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {

  describe('breadcrumb', function() {

    it('should render breadcrumb for empty $location', function() {
      browser.get('index.html');
      expect(element.all(by.css('[step] b')).first().getText()).
        toMatch(/Set: Accounts/);
      expect(element.all(by.css('[step] b')).last().getText()).
        toMatch(/Set: Client/);
    });

    it('should render breadcrumb for custom location', function() {
      browser.get('index.html#/aaaaa/bbbbb');
      expect(element.all(by.css('[step] b')).first().getText()).
        toMatch(/Set: aaaaa/);
      expect(element.all(by.css('[step] b')).last().getText()).
        toMatch(/Set: bbbbb/);
    });
  });
});
