'use strict';

describe('myApp.hello module', function() {
  var $compile;
  var $rootScope;

  beforeEach(module('myApp.hello'));
  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));


  describe('hello directive', function() {
    it('should say hello to ted', function() {
      var element = $compile('<hello></hello>')($rootScope);
      expect(element.text()).toBe("hello there ted");
    });
  });
});