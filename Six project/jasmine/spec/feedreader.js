$(function () {
    describe('RSS Feeds', function () {
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        it('loop each feed, check URL', function () {
            var item;
            for (var i = 0; i < allFeeds.length; i++) {
                item = allFeeds[i];
                expect(item.url).toBeDefined();
            }
        })

        it('loop each feed, check name', function () {
            var item;
            for (var i = 0; i < allFeeds.length; i++) {
                item = allFeeds[i];
                expect(item.name).toBeDefined();
            }
        })
    });


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
