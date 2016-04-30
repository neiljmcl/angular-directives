'use strict';

describe('myApp.view1 module', function() {

  beforeEach(module('myApp.hello'));

  describe('hello directive', function(){
    it('should fail', inject(function() {
      expect(true).toBe(false);
    }));
  });
});