/* Karma configuration
 * http://karma-runner.github.io/0.10/config/configuration-file.html
 */

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    // including .test files.
    // Be aware that if no tests pass then the gulp task will throw horrible
    // errors, and that missing a depenency from this file list can cause tests
    // that would otherwise pass to fail.
    files: [
      '../node_modules/jquery/dist/jquery.js',
      '../node_modules/angular/angular.js',
      '../node_modules/angular-route/angular-route.js',
      '../node_modules/angular-mocks/angular-mocks.js',
      '../src/app/app.module.js',
      '../src/app/app.config.js',
      '../src/app/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // hostname
    hostname: '127.0.0.1',

    // web server port
    port: 8083,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],

    colors: true,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    // Add code coverage.

    // The files we should count in code coverage.
    // Excludes .spec.js and .test.js test files.
    preprocessors: {
      '../app/**/!(*spec|*test).js': ['coverage']
    },

    // Test results reporter to use.
    reporters: [
      'progress',
      'coverage'
    ],

    // Output code coverage destination.
    coverageReporter: {
      // specify a common output directory
      dir: 'report/coverage',
      reporters: [
        // reporters not supporting the `file` property
        { type: 'html', subdir: 'report/report-html' },
        { type: 'lcov', subdir: 'report/report-lcov' },
        { type: 'json', subdir: 'report/coverage'}]
    }

  });
};
