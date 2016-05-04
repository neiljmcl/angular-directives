'use strict';

describe('myApp.hello module', function() {
  var $compile;
  var $rootScope;
  var greetingService = {};

  beforeEach(module('app.templates'));
  beforeEach(function() {
    module('myApp.hello');

    inject(function(_$compile_, _$rootScope_, $q) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    });
  });

  describe('hello directive', function() {
    it('should greet ted appropriately', function() {
      var element = $compile('<hello></hello>')($rootScope);
      $rootScope.$digest();
      expect(element.text().trim()).toBe("Great to see you Ted, you big eejit");
    });
  });
});