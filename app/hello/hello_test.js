'use strict';

describe('myApp.hello module', function() {
  var $compile;
  var $rootScope;
  var greetingService = {};

  beforeEach(module('app.templates'));
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
    var element;
    beforeEach(function() {
      element = $compile('<hello></hello>')($rootScope);
      $rootScope.$digest();
    });
    it('should greet ted appropriately', function() {
      // This is a jqLite test - best practice is probably to use the more flexible jQuery in tests.
      expect(element
        .find('h1')
        .find('span').text())
        .toBe("Feck off Ted, you big eejit");
    });
    it('should work with jQuery as well as jq lite', function() {
      expect($(element.find('h1 span')).text()).toBe('Feck off Ted, you big eejit');
    });
    it('should contain a subdirective', function() {
      expect(element.find('my-buttonator').length).toBe(1);
    });
    describe('my-buttonator functionality', function() {
      var buttonator;
      var controller;
      beforeEach(function() {
        buttonator = element.find('my-buttonator');
        controller = buttonator.controller('myButtonator');
        spyOn(controller, 'drink');
      });

      it('I got our controller', function() {
        expect(controller).toBeDefined();
      });

      it('contains a warning message', function() {
        expect(buttonator.find('em').text()).toBe("DO NOT PRESS THIS BUTTON");
      });
      it('contains a button', function() {
        expect(buttonator.find('button').text()).toBe("Big Button");
      });
      it('asks for a drink when pressed', function() {
        var button = buttonator.find('button');
        button.triggerHandler('click');
        expect(controller.drink).toHaveBeenCalled();
      });
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
        expect(element.find('H1').find('span').text()).toBe("Careful now Ted, you big eejit");
      });
    });
  });
});