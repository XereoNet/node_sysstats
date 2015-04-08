require("jasmine-beforeall");

var stats = require("../lib/sysstats.js")();

describe("Sysstats", function () {
    it("should be a function", function () {
        expect(require("../lib/sysstats.js") instanceof Function).toBe(true);
    });

    it("should have a .cpus method which returns the cpus", function () {
        expect(stats.cpus instanceof Function).toBe(true);
        expect(stats.cpus() instanceof Array).toBe(true);
        expect(stats.cpus().length).toBe(require("os").cpus().length);
    });

    it("should return a cpu usage different from the one before every second", function (next) {
        var last;
        setTimeout(function () {
            last = stats.cpus();
            setTimeout(function () {
                var current = stats.cpus();

                expect(last == current).toBe(false);
                next();
            }, 1000);
        }, 1000);
    });

    it("should create a new listener after unref and recall", function () {
        var oldListener = stats;
        stats.unref();
        stats = require("../lib/sysstats.js")();

        expect(stats).toNotBe(oldListener);
    });

    it("should have a mem method which returns the used and total memory", function () {
        expect(stats.mem instanceof Function).toBe(true);
        expect(stats.mem().used).toBeDefined();
        expect(stats.mem().total).toBeDefined();
    });

    afterAll(function () {
        stats.unref();
    });
});
