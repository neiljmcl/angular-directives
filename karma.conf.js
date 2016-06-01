module.exports = function(config){
  config.set({
    basePath : './',

    preprocessors: {
      'app/craggy_island/*.html': ['ng-html2js']
    },

    files : [
      'app/bower_components/jquery/dist/jquery.min.js',
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/craggy_island/*.js',
      'app/craggy_island/*.html'
    ],


    ngHtml2JsPreprocessor: {
      stripPrefix: 'app/',
      moduleName: 'app.templates'
    },

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-ng-html2js-preprocessor'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
