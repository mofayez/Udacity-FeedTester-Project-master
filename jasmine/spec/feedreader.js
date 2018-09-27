'use strict';
/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(
  (() => {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', () => {
      /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
      it('are defined', () => {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });

      /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
      it('has a url defined', () => {
        allFeeds.forEach(feed => {
          expect(feed.url).toBeDefined();
          expect(feed.url.length).not.toBe(0);
        });
      });

      /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
      it('has a name defined', () => {
        allFeeds.forEach(feed => {
          expect(feed.name).toBeDefined();
          expect(feed.name.length).not.toBe(0);
        });
      });
    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', () => {
      /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
      let bodyElement = document.querySelector('body');
      let menuElement = document.querySelector('.menu-icon-link');
      let myBool;

      it('element is hidden by default', () => {
        // Check if body element contains the deafult class 'menu-hidden'
        myBool = bodyElement.classList.contains('menu-hidden');

        expect(myBool).toBe(true);
      });

      /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
      it('toggles visibility', () => {
        menuElement.click();
        expect(bodyElement.classList.contains('menu-hidden')).toBe(false);

        menuElement.click();
        expect(bodyElement.classList.contains('menu-hidden')).toBe(true);
      });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', () => {
      /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
      beforeEach(done => {
        loadFeed(0, done);
      });

      it('has at least a single entry', () => {
        let feed = document.querySelector('.feed');
        let entry = feed.getElementsByClassName('entry');
        expect(entry.length > 0).toBe(true);
      });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', () => {
      /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

      let container = document.querySelector('.feed');
      let firstContent, secondContent;

      beforeEach(done => {
        loadFeed(0, () => {
          firstContent = container.innerHTML;

          loadFeed(1, () => {
            done();
          });
        });
      });

      it('content changes', () => {
        secondContent = container.innerHTML;
        expect(firstContent === secondContent).toBe(false);
      });
    });
  })()
);
