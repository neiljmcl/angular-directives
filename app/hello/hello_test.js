'use strict';

describe('myApp.hello module', function() {
  var $compile;
  var $rootScope;
  beforeEach(module('myApp.hello'));

  beforeEach(inject(function(_$compile_, _$rootScope_, GreetingsService) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    GreetingsService.sayHello = function() {return "Bugger off"};
  }));

  describe('hello directive', function() {
    it('should inject the modified service', function() {
      inject(function(GreetingsService) {
        expect(GreetingsService).toBeDefined();
        expect(GreetingsService.sayHello()).toBe("Bugger off");
      });
    });
    it('should say hello to ted', function() {
      var element = $compile('<hello></hello>')($rootScope);
      $rootScope.$digest();
      expect(element.text()).toBe("Bugger off ted");
    });
  });
});