describe('Controller: DisplayController', function() {
  var
    DisplayController,
    scope;

  beforeEach(function(){
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

      DisplayController = $controller('DisplayController as display', localInjections);
    });
  });

});
