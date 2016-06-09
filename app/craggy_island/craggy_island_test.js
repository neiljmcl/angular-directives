'use strict';

describe('myApp.craggy_island module', function() {
  var $compile;
  var $rootScope;
  var $q;
  var craggyIslandService;

  beforeEach(module('app.templates'));
  beforeEach(function() {
    craggyIslandService = jasmine.createSpyObj('craggyIslandService', ['sayHello', 'getDrink', 'getDirections']);
    craggyIslandService.getDrink.and.callThrough();
    craggyIslandService.getDirections.and.callThrough();
    module('myApp.hello', function($provide) {
      $provide.value('CraggyIslandService', craggyIslandService);
    });
    inject(function(_$compile_, _$rootScope_, _$q_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $q = _$q_;
    });
  });

  describe('craggy island', function() {
    var element;
    var craggyIslandService;
    beforeEach(inject(function(CraggyIslandService, $q) {
      craggyIslandService = CraggyIslandService;
      craggyIslandService.sayHello = function() {
        var deferred = $q.defer();
        deferred.resolve("Get the feck off our island");
        return deferred.promise;
      };
      spyOn(craggyIslandService, 'sayHello').and.callThrough();

      element = $compile('<craggy-island></craggy-island>')($rootScope);
      $rootScope.$digest();
    }));
    it('should contain correct header (using jqLite: best practice is probably jQuery for tests)', function() {
      expect(element
        .find('h1')
        .find('span').text())
        .toBe("Get the feck off our island you big eejit!");
    });
    it ('spies on the sayHello call', function() {
      expect(craggyIslandService.sayHello).toHaveBeenCalled();
    });
    it('should contain an image of the tourist board', function() {
      expect(element.find('img').length).toBe(1);
      expect(element.find('img').attr('src')).toBe('img/tourist_office.jpg');
      expect(element.find('img').attr('alt')).toBe('tourist office');
    });
    it('should contain a subdirective', function() {
      expect(element.find('craggy-island-directions').length).toBe(1);
    });

    it('should contain directions directive', function() {
      expect(element.find('craggy-island-directions').length).toBe(1);
    });

    it('should contain inhabitants directive', function() {
      expect(element.find('craggy-island-inhabitants').length).toBe(1);
    });
    it('should contain a find-accommodation component', function() {
      expect(element.find('craggy-island-find-accommodation').length).toBe(1);
    });

    describe('directions [to craggy island]', function() {
      var directionsControl;
      var controller;
      beforeEach(function() {
        craggyIslandService.getDirections = function() {
          var deferred = $q.defer();
          deferred.resolve("Don't bother your arse");
          return deferred.promise;
        };
        spyOn(craggyIslandService, 'getDirections').and.callThrough();

        directionsControl = element.find('craggy-island-directions');
        controller = directionsControl.controller('craggy-island-directions');
        spyOn(controller, 'showDirections').and.callThrough();
      });
      afterEach(function() {
        craggyIslandService.getDirections.calls.reset();
      });

      it('contains a warning message', function() {
        expect(directionsControl.find('span.warning').text()).toBe("As a general rule, if you're going away from the island, you're going in the right direction");
      });

      it('contains a directions button', function() {
        expect(directionsControl.find('button').text()).toBe("Get Directions");
      });

      it('calls the controller#showDirections method when pressed', function() {
        var button = directionsControl.find('button');
        button.triggerHandler('click');
        expect(controller.showDirections).toHaveBeenCalled();
      });

      it('calls service#getDirections in response to controller#showDirections', function() {
        controller.showDirections();
        expect(craggyIslandService.getDirections).toHaveBeenCalled();
      });
      it('does not expose directions prior to any call to showDirections', function() {
        expect(controller.directions).not.toBeDefined();
      });
      it('does expose directions subsequent to a call to showDirections', function() {
        controller.showDirections();
        $rootScope.$digest();
        expect(controller.directions).toBe("Don't bother your arse");
      });
      it('toggles directions display on subsequent button press', function() {
        controller.showDirections();
        $rootScope.$digest();
        controller.showDirections();
        $rootScope.$digest();
        expect(controller.directions).toBeUndefined();
      });
      it('does not display directions when the controller is not providing any', function() {
        expect(directionsControl.find('div.directions span.directions').length).toBe(0);
      });
      it('does display directions when the controller is providing them', function() {
        controller.directions = "Don't bother your arse";
        $rootScope.$digest();
        expect(directionsControl.find('div.directions span.directions').length).toBe(1);
        expect(directionsControl.find('div.directions span.directions').text()).toBe("Don't bother your arse");
      });
    });
    describe('the inhabitants', function() {
      it('contains a header', function() {
        expect(element.find('h2').text()).toContain("Meet the inhabitants of craggy island");
      });
      it('contains Fr Ted', function() {
        expect(element.find('craggy-island-inhabitants ul li').text()).toContain("Fr Ted");
      });
      it('contains Fr Ted', function() {
        expect(element.find('craggy-island-inhabitants ul li').text()).toContain("Fr Dougal");
      });
    });
    describe('the accommodation component', function() {
      var accommodationComponent;
      var controller;
      beforeEach(function() {
        accommodationComponent = element.find('craggy-island-find-accommodation');
        controller = accommodationComponent.controller('craggy-island-find-accommodation');
      });
      it('has correct title', function() {
        expect(accommodationComponent.find('h2').text()).toBe("Find Accommodation: Sure what's not to like?");
      });
      it('has a controller', function() {
        expect(controller).toBeDefined();
      });
      it('contains a form', function() {
        expect(accommodationComponent.find('form').length).toBe(1);
      });
      describe('the accommodation form', function() {
        var accommodationForm;
        beforeEach(function() {
          accommodationForm = accommodationComponent.find('form');
        });
        it('has an input for name', function() {
          expect(accommodationForm.find("input[type='text'][name='name']").length).toBe(1);
        });
        it('accepts input', function() {
          var nameInput = accommodationForm.find("input[type='text'][name='name']")
          nameInput.val('Dora Bunner').trigger('input');
          expect(controller.name).toBe("Dora Bunner");
        });
      });
    });

    it('should display introduction message even when there is a service error', function() {
      var craggyIslandService;
      inject(function(CraggyIslandService, $q) {
        craggyIslandService = CraggyIslandService;
        craggyIslandService.sayHello = function() {
          var deferred = $q.defer();
          deferred.reject("its broken");
          return deferred.promise;
        };
        spyOn(craggyIslandService, 'sayHello').and.callThrough();

        var element = $compile('<craggy-island></craggy-island>')($rootScope);
        $rootScope.$digest();
        expect(element.find('H1').find('span').text()).toBe("Careful now you big eejit!");
      });
    });
  });
});