describe('Controller: MainController', function() {
  var
    MainController,
    scope;

  beforeEach(function () {
    // Instantiate a new version of the module before each test.
    module('app');

    // Before each unit test, instantiate a new instance of the controller.
    // This will run before each it() below.
    inject(function($controller, $rootScope) {
      var localInjections;

      scope = $rootScope.$new();
      localInjections = {
        $scope: scope
      };

      MainController = $controller('MainController as main', localInjections);
    });
  });

  describe('scope', function() {
    it("should be an object", function () {
      expect(typeof MainController).toEqual('object');
      expect(MainController).toBeDefined();
    });
  });
});
