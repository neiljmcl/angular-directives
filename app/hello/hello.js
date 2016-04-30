'use strict';


angular.module('myApp.hello', [])
  .directive('hello', function() {
    return {
      template: '<h1>hello there ted</h1>'
    };
  })

