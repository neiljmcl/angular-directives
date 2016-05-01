'use strict';


angular.module('myApp.hello', [])
  .factory('GreetingsService', function() {
    return {
      sayHello: function() {
        return "Zdravo";
      }
    }
  })
  .value('Salutation', "Zdravi")
  .directive('hello', ['GreetingsService', function(greetingsService) {
    return {
      scope: {},
      bindToController: true,
      controllerAs: 'ctrl',
      controller: [function() {
        this.greeting = greetingsService.sayHello();
      }],
      template: '<h1>{{ctrl.greeting}} ted</h1>'
    };
  }])

