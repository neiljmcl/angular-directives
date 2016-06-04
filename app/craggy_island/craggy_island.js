'use strict';


angular.module('myApp.hello', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/craggy_island'});
  }])
  .factory('CraggyIslandService', ['$q', function($q) {
    var deferredMessage = function(msg) {
      var deferred = $q.defer();
      deferred.resolve(msg);
      return deferred.promise;
    }
    return {
      getDirections: function() {
        return deferredMessage("It wouldn't be on any maps. We're not exactly New York! " +
          "No, the best way to find it is to head out from Galway and go slightly north until you see the English boats with the nuclear symbol. " +
          "They go very close to the island when dumping the old 'glow-in-the-dark'.");
      },
      sayHello: function() {
        return deferredMessage("Welcome to Craggy Island");
      },
      getDrink: function(s) {
        console.log("Drink!");
      },
      searchForAccommodation: function(accommodationDetails) {
        console.log("Search for accommodation for ", accommodationDetails.name , " and", accommodationDetails.address);
      }
    }
  }])
  .directive('craggyIsland', ['CraggyIslandService', function(craggyIslandService) {
    return {
      scope: {},
      bindToController: true,
      controllerAs: 'ctrl',
      controller: [function() {

        var ctrl = this;
        craggyIslandService.sayHello()
          .then(function(msg) {
            ctrl.greeting = msg;
          }).catch(function() {
            ctrl.greeting = "Careful now";
          })
      }],
      templateUrl: 'craggy_island/craggy_island.html'
    };
  }])
  .directive('directions', ['CraggyIslandService', '$log', function(craggyIslandService, $log) {
    return {
      scope: {},
      bindToController: true,
      controllerAs: 'ctrl',
      controller: [function () {
        var ctrl = this;
        ctrl.showDirections = function () {
          if (angular.isUndefined(ctrl.directions)) {
            craggyIslandService.getDirections().then(function(directions) {
              ctrl.directions = directions;
            }).catch(function() {
              ctrl.directions = "Try again later"
            })
          } else {
            ctrl.directions = undefined;
          }
        };
      }],
      templateUrl: 'craggy_island/directions.html'
    };
  }])
  .directive('craggyIslandInhabitants', ['CraggyIslandService', '$log', function(craggyIslandService, $log) {
    return {
      scope: {},
      bindToController: true,
      controllerAs: 'ctrl',
      controller: [function () {
        var ctrl = this;
      }],
      templateUrl: 'craggy_island/inhabitants.html'
    };
  }])
  .directive('craggyIslandFindAccommodation', ['CraggyIslandService', '$log', function(craggyIslandService, $log) {
    return {
      scope: {},
      bindToController: true,
      controllerAs: 'ctrl',
      controller: [function () {
        var ctrl = this;
        ctrl.reset = function() {
          $log.info("Resetting form", ctrl);
        };
        ctrl.submit = function() {
          craggyIslandService.searchForAccommodation({name: ctrl.name, address: ctrl.address})
        };

      }],
      templateUrl: 'craggy_island/find_accommodation.html'
    };
  }]);

