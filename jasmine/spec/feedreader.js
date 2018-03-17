/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* This test takes in an array where all feeds are stored and loops through
       it and verify that url of each feed are defined and not empty.
         */

    it('URLs are defined and not empty', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toBe(0);
      });
    });

    /*  This test takes in an array where all feeds are stored and loops through
       it and verify that name of each feed are defined and not empty.
         */

    it('name of feed is not empty and defined', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.name).toBeDefined();
        expect(feed.name.length).not.toBe(0);
      });
    });
  });

  /* Test suite that ensures proper behaviour of menu */

  describe('The menu', function() {
    /* This test checks if menu is hidden by default */

    it('hidden by default', function() {
      expect(document.body.className).toContain('menu-hidden');
    });

    /* This test ensures that when menu is clicked it appears and hides on other click */

    it('visible when clicked', function() {
      $('a.menu-icon-link').click();
      expect($('body').hasClass('menu-hidden')).not.toBe(true);
    });

    it('not visible when clicked again', function() {
      $('a.menu-icon-link').click();
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });
  });

  /* This test ensures that there is at least 1 entry within feed container*/
  describe('Initial Entries', function() {
    let entry;
    beforeEach(function(done) {
      loadFeed(0, function() {
        done();
      });
    });

    it('is present', function(done) {
      entry = $('.feed .entry');
      expect(entry).not.toBe(undefined);
      expect(entry.length).not.toBe(0);
      done();
    });
  });
  /* Checks if one feed is differs from another */
  describe('New Feed Selection', function() {
    let content;

    beforeEach(function(done) {
      loadFeed(0, function() {
        // feed 0 done loading
        firstFeed = $('.feed').html();
        loadFeed(1, function() {
          //feed 1 done loading
          secondFeed = $('.feed').html();
          done();
        });
      });
    });
    /* Test that checks changing of content   */
    it('loaded and changes the content', function() {
      expect(firstFeed).not.toEqual(secondFeed);
    });
  });
});
