// Karma configuration
// Generated on Fri May 22 2015 14:53:02 GMT+0300 (MSK)

module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine', 'systemjs'],

    files: [
      {pattern: 'node_modules/babel-core/browser-polyfill.js', included: true}
    ],

    systemjs: {
      configFile: './system.conf.js',

      files: [
        'bower_components/**/bower.json',
        'bower_components/**/*.js',
        'bower.json',
        'src/**/*.js',
        'src/**/*.test.js'
      ],

      testFileSuffix: '.test.js'
    },

    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/!(*.test).js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter: {
      reporters: [
        {type: 'html', dir:'coverage/'},
        {type: 'text-summary'}
      ],
      //type : 'html',
      //dir : 'coverage/',

      instrumenters: { isparta : require('isparta') },
      instrumenter: {
        '**/*.js': 'isparta'
      }
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
