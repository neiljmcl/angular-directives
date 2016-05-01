'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'myApp.hello'
])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/view1'});
  }])

  .factory('GreetingsService', function() {
    return {
      sayHello: function() {
        return "Zdravo";
      }
    }
  })
  .value('Salutation', "Zdravi");
