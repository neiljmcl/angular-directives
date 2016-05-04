'use strict';


angular.module('myApp.hello', [])
  .directive('hello', [function() {
    return {
      scope: {},
      bindToController: true,
      controllerAs: 'ctrl',
      controller: [function() {
        var ctrl = this;
        ctrl.greeting = "Great to see you";
      }],
      templateUrl: 'hello/hello.html'
      // template: '<h1>{{ctrl.greeting}} Ted</h1>'
    };
  }])

