$(function () {
    /**
     * Tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty.
     */
    describe('RSS Feeds', function () {
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /**
         * Check items that have attribute url in model
         */
        it('loop each feed, check URL', function () {
            var item;
            for (var i = 0; i < allFeeds.length; i++) {
                item = allFeeds[i];
                expect(item.url).toBeDefined();
                expect(item.url).not.toBe('');
            }
        })
        /**
         * Check items that have attribute name in model
         */
        it('loop each feed, check name', function () {
            var item;
            for (var i = 0; i < allFeeds.length; i++) {
                item = allFeeds[i];
                expect(item.name).toBeDefined();
                expect(item.name).not.toBe('');
            }
        })
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

        it('changes visibility after click', function () {
            var currentClass = body.attr('class');
            var expectedNewClass = (body.hasClass('menu-hidden')) ? '' : 'menu-hidden';

            menuIcon.click();
            expect(body.attr('class')).toBe(expectedNewClass);

            menuIcon.click();
            expect(body.attr('class')).toBe(currentClass);
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
        var content;

        beforeEach(function (done) {
            content = $('.feed').html();
            loadFeed(1, function () {
                done();
            });
        });

        it('changes the content displayed', function (done) {
            var newContent = $('.feed').html();
            expect(content).not.toBe(newContent);
            done();
        });
    });
}());
