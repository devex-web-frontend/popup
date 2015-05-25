// Karma configuration
// Generated on Fri May 22 2015 14:53:02 GMT+0300 (MSK)

module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['jspm', 'jasmine'],

    files: [
      //es-5-6-7 polyfills
      './node_modules/core-js/client/core.js'
    ],

    jspm: {
      loadFiles: ['src/**/*.test.js'],
      serveFiles: ['src/**/*.js']
    },

    preprocessors: {
      'src/**/!(*.test).js': ['coverage']
    },

    reporters: ['dots', 'coverage'],

    coverageReporter: {
      reporters: [
        {type: 'html', dir: 'coverage/'},
        {type: 'text-summary'}
      ],

      instrumenters: {isparta: require('isparta')},
      instrumenter: {
        '**/*.js': 'isparta'
      }
    },

    port: 9876,
    colors: true,

    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    autoWatch: true,
    singleRun: false,

    browsers: ['PhantomJS']
  });
};
