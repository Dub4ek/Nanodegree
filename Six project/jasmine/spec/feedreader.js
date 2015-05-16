$(function () {
    /**
     * Tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty.
     */
    'use strict';
    describe('RSS Feeds', function () {
        it('check feed items', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).toBeGreaterThan(0);
        });

        /**
         * Check items that have attribute url in model
         */
        it('Check URL of every feed', function () {
            var item;
            for (var i = 0; i < allFeeds.length; i++) {
                item = allFeeds[i];
                expect(item.url).toBeDefined();
                expect(item.url).not.toBe('');
            }
        });
        it('Check URL spelling of each feed', function () {
            var item;
            for (var i = 0; i < allFeeds.length; i++) {
                item = allFeeds[i];
                expect(item.url).toMatch(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/);
            }
        });
        /**
         * Check items that have attribute name in model
         */
        it('Check name of every feed', function () {
            var item;
            for (var i = 0; i < allFeeds.length; i++) {
                item = allFeeds[i];
                expect(item.name).toBeDefined();
                expect(item.name).not.toBe('');
                expect(typeof item.name).toEqual('string');
            }
        });
    });

    /**
     * Test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * should have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */
    describe('The menu', function () {
        var body = $('body');
        var menuIcon = $('.menu-icon-link');

        it('hidden by default', function () {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

        it("changes visibility after click", function() {
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /**
     * Test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test wil require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */
    describe('Initial entries', function () {
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        it('have at least one entry', function (done) {
            var numEntries = $('.feed .entry').length;
            expect(numEntries).toBeGreaterThan(0);
            done();
        });
    });
    /**
     * Test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
    describe('New feed selection', function () {
        var self = this;

        beforeEach(function(done) {

            self.feedListLink = $('.feed-list a');
            self.contentChanged = false;

            $('.feed').on('DOMSubtreeModified', function() {
                self.contentChanged = true;
            });

            loadFeed(1, done);

        });

        it("changes the content displayed", function(done) {
            expect(self.contentChanged).toBe(true);
            done();
        });

    });
}());
