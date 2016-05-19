'use strict';

describe('myApp.hello module', function() {
  var $compile;
  var $rootScope;
  var greetingService;

  beforeEach(module('app.templates'));
  beforeEach(function() {
    greetingService = jasmine.createSpyObj('greetingService', ['sayHello', 'getDrink']);
    greetingService.getDrink.and.callThrough();
    module('myApp.hello', function($provide) {
      $provide.value('GreetingsService', greetingService);
    });
    inject(function(_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    });
  });

  describe('hello directive', function() {
    var element;
    var greetingService;
    beforeEach(inject(function(GreetingsService, $q) {
      greetingService = GreetingsService;
      greetingService.sayHello = function() {
        var deferred = $q.defer();
        deferred.resolve("Feck off");
        return deferred.promise;
      };
      spyOn(greetingService, 'sayHello').and.callThrough();

      element = $compile('<hello></hello>')($rootScope);
      $rootScope.$digest();
    }));
    it('should greet ted appropriately (using jqLite: best practice is probably jQuery for tests)', function() {
      expect(element
        .find('h1')
        .find('span').text())
        .toBe("Feck off Ted, you big eejit");
    });
    it('should greet ted appropriately (using jQuery, which is more flexible)', function() {
      expect($(element.find('h1 span')).text()).toBe('Feck off Ted, you big eejit');
    });
    it ('spies on the sayHello call', function() {
      expect(greetingService.sayHello).toHaveBeenCalled();
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
        spyOn(controller, 'drink').and.callThrough();
      });
      afterEach(function() {
        greetingService.sayHello.calls.reset();
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

      it('delegates the controller.drink method to the underlying service', function() {
        controller.drink();
        expect(greetingService.getDrink).toHaveBeenCalledWith("Bring me a fecking drink");
      });
    });

    it('should greet ted appropriately even when there is a service error', function() {
      var greetingService;
      inject(function(GreetingsService, $q) {
        greetingService = GreetingsService;
        greetingService.sayHello = function() {
          var deferred = $q.defer();
          deferred.reject("its broken");
          return deferred.promise;
        };
        spyOn(greetingService, 'sayHello').and.callThrough();

        var element = $compile('<hello></hello>')($rootScope);
        $rootScope.$digest();
        expect(element.find('H1').find('span').text()).toBe("Careful now Ted, you big eejit");
      });
    });
  });
});