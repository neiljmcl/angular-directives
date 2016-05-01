'use strict';

describe('myApp.hello module', function() {
  var $compile;
  var $rootScope;
  beforeEach(module('myApp.hello'));

  describe('overriding the Salutation within this test suite', function() {
    it('says feck off!', function() {
      module(function($provide) {
        $provide.value('Salutation', "Feck off");
      });
      inject(function(Salutation) {
        expect(Salutation).toBe("Feck off");
      });
    });
  });

  describe('overriding the Salutation for our directive test', function() {
    it('uses the overridden salutation', function() {
      module(function($provide) {
        $provide.value('Salutation', "Hello there");
      });
      inject(function(Salutation, $compile, $rootScope) {
        var element = $compile('<hello></hello>')($rootScope);
        $rootScope.$digest();
        expect(element.text()).toBe("Hello there ted");
      });
    });
  });

  describe('overriding the GreetingsService within this test suite', function() {
    it ('speaks russian', function() {
      module(function($provide) {
        $provide.value('GreetingsService', {
          sayHello: function() {
            return "Bugger off";
          }
        });
      });
      inject(function(GreetingsService) {
        expect(GreetingsService).toBeDefined();
        expect(GreetingsService.sayHello()).toBe("Bugger off");
      });
    });
  })

  xdescribe('hello directive', function() {

    xit ('should provide a salutation', function() {
      inject(function(Salutation) {
        expect(Salutation).toBe("Feck off");
      })
    });
    xit('should say hello to ted', function() {
      var element = $compile('<hello></hello>')($rootScope);
      expect(element.text()).toBe("hello there ted");
    });
  });


});