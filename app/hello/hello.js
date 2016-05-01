'use strict';


angular.module('myApp.hello', [])
  .directive('hello', ['Salutation', function(salutation) {
    return {
      scope: {},
      bindToController: true,
      controllerAs: 'ctrl',
      controller: [function() {
        this.greeting = salutation;
      }],
      template: '<h1>{{ctrl.greeting}} ted</h1>'
    };
  }])

