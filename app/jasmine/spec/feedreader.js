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
     ***1 failure spec - "RSS Feeds are defined" in case the array is empty***
     */
    it('RSS Feeds are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* TODO: Write a test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it("URL not empty/has valid URL", function() {
      for (let i in allFeeds) {
        expect(allFeeds[i].url).toBeDefined();
        expect(allFeeds[i].url.length).not.toBe(0);
        expect(allFeeds[i].url).not.toBe("");
      };
    });

    /* TODO: Write a test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it("RSS Feeds has name", function() {
      for (let i in allFeeds) {
        expect(allFeeds[i].name).toBeDefined();
        expect(allFeeds[i].name).not.toBe("");

      };
    });
  });


  /* TODO: Write a new test suite named "The menu" */
  describe("The Menu", function() {

    /* TODO: Write a test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */
    // reference: https://jasmine.github.io/2.0/introduction.html

    it("By default Menu element is hidden", function() {
      // expect(document.body.className).toContain("menu-hidden"); // changed as per recommendation using Jquery
      expect($("body").hasClass("menu-hidden")).toBe(true);
    });

    /* TODO: Write a test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * should have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */
    it("Toggle function on Menu Icon", function() {
      let menuIcon = document.querySelector(".menu-icon-link");
      menuIcon.click();
      // expect(document.body.className).not.toContain("menu-hidden"); // changed as per recommendation using Jquery
      expect($("body").hasClass("menu-hidden")).not.toBe(true);

      menuIcon.click();
      // expect(document.body.className).toContain("menu-hidden"); // // changed as per recommendation using Jquery
      expect($("body").hasClass("menu-hidden")).toBe(true);
    });

  });

  /* TODO: Write a new test suite named "Initial Entries" */
  describe("Initial Entries", function() {
    /* TODO: Write a test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */
    beforeEach(function(done) {
      loadFeed(0, function() {
        done();
      });
    });

    it("Feed container has atleast one entry", function() {
      // var entryNumber = $(".entry").length; changed as per recommendation using Jquery and parent and child node 
      expect($(".feed .entry").length).toBeGreaterThan(0);
    });
  });

  /* TODO: Write a new test suite named "New Feed Selection" */
  describe('New Feed Selection', function() {
    var feedListFirst;
    var feedListSecond;
    /* TODO: Write a test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */

    beforeEach(function(done) {
      loadFeed(1, function() {
        feedListFirst = $('.feed').html();
        loadFeed(2, function() {
          done();
        });
      });
    });

    afterEach(function() {
      loadFeed(0);
    });

    it('Feed content display and changes', function() {
      expect(feedListFirst).toBeDefined();
      feedListSecond = $('.feed').html();
      expect(feedListSecond).toBeDefined();
      expect(feedListFirst).not.toEqual(feedListSecond);
    });
  });
}());
