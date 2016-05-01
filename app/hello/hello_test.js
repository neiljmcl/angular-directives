'use strict';

describe('myApp.hello module', function() {
  var $compile;
  var $rootScope;
  var greetingService = {};
  beforeEach(function() {
    module('myApp.hello', function($provide) {
      $provide.value('GreetingsService', greetingService);
    });

    inject(function(_$compile_, _$rootScope_, $q) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      greetingService.sayHello = function() {
        var deferred = $q.defer();
        deferred.resolve("Feck off");
        return deferred.promise;
      };
    });
  });

  describe('hello directive', function() {
    it('should greet ted appropriately', function() {
      var element = $compile('<hello></hello>')($rootScope);
      $rootScope.$digest();
      expect(element.text()).toBe("Feck off ted");
    });
    it('should greet ted appropriately even when there is a service error', function() {
      inject(function(GreetingsService, $q) {
        GreetingsService.sayHello = function() {
          var deferred = $q.defer();
          deferred.reject("its broken");
          return deferred.promise;
        };

        var element = $compile('<hello></hello>')($rootScope);
        $rootScope.$digest();
        expect(element.text()).toBe("Careful now ted");
      });

    });
  });
});