/**
 * Created by Dub4ek on 1/23/15.
 */


module.exports = function (config) {
    config.set({
            // base path, that will be used to resolve files and exclude
            basePath: '',

            frameworks: ['jasmine'],
            // list of files / patterns to load in the browser
            files: [

                {pattern: 'test/*Test.js', include: true},
                {pattern: 'test/**/*Test.js', include: true},
                {pattern: 'src/**/*.js', include: true}
            ],

            // list of files to exclude
            exclude: [
            ],

            // use dots reporter, as travis terminal does not support escaping sequences
            // possible values: 'dots', 'progress', 'junit', 'teamcity'
            // CLI --reporters progress
            reporters: ['progress'],

            // web server port
            // CLI --port 9876
            port: 9876,


            // enable / disable colors in the output (reporters and logs)
            // CLI --colors --no-colors
            colors: true,

            logLevel: config.LOG_INFO,

            // enable / disable watching file and executing tests whenever any file changes
            // CLI --auto-watch --no-auto-watch
            autoWatch: true,

            // Start these browsers, currently available:
            // - Chrome
            // - ChromeCanary
            // - Firefox
            // - Opera
            // - Safari (only Mac)
            // - PhantomJS
            // - IE (only Windows)
            // CLI --browsers Chrome,Firefox,Safari
            browsers: ['Firefox'],

            customLaunchers: {
                chrome_without_security: {
                    base: "Chrome",
                    flags: ["--disable-web-security"]
                }
            },

            // If browser does not capture in given timeout [ms], kill it
            // CLI --capture-timeout 5000
            captureTimeout: 5000,

            // Auto run tests on start (when browsers are captured) and exit
            // CLI --single-run --no-single-run
            singleRun: false,
        }
    )
    ;
}
;