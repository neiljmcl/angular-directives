'use strict';


angular.module('myApp.hello', [])
  .factory('GreetingsService', ['$q', function($q) {
    return {
      sayHello: function() {
        var deferred = $q.defer();
        deferred.resolve("Hello there")
        return deferred.promise;
      }
    }
  }])
  .value('Salutation', "Zdravo")
  .directive('hello', ['GreetingsService', function(greetingsService) {
    return {
      scope: {},
      bindToController: true,
      controllerAs: 'ctrl',
      controller: [function() {

        var ctrl = this;
        greetingsService.sayHello()
          .then(function(msg) {
            ctrl.greeting = msg;
          }).catch(function() {
            ctrl.greeting = "Careful now";
          })
      }],
      templateUrl: 'hello/hello.html'
    };
  }])

