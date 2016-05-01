'use strict';

describe('myApp.hello module', function() {
  var $compile;
  var $rootScope;
  beforeEach(function() {
    module('myApp.hello', function($provide) {
      $provide.value('GreetingsService', {
        sayHello: function() {
          return "Feck off";
        }
      });
    });

    inject(function(_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    });
  });

  describe('hello directive', function() {

    it('should inject the modified service', function() {
      inject(function(GreetingsService) {
        expect(GreetingsService).toBeDefined();
        expect(GreetingsService.sayHello()).toBe("Feck off");
      });
    });
    it('should say hello to ted', function() {
      var element = $compile('<hello></hello>')($rootScope);
      $rootScope.$digest();
      expect(element.text()).toBe("Feck off ted");
    });
  });
});