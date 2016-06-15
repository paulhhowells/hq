(function() {
  'use strict';

  angular
    .module('app')
    .directive('widget', ['$compile', widgetDirective]);

  function widgetDirective ($compile) {
    var availableWidget = {
      pie : true,
      bar : true,
      gauge : true
    };

    return {
      restrict : 'AE',
      scope : {
        config : '=config',
        source : '<source',
        feed : '<feed'
      },
      compile : compile,
      controllerAs: 'widget'
    };

    function compile (element, attributes) {
      return {
        post : postLink
      };

      function postLink (scope, element, attributes) {
        var
          $ = angular.element,
          elementHTML;

        if (availableWidget[scope.config.display]) {
          // elementHTML = '<' + scope.config.display + '></' + scope.config.display + '>';
          elementHTML = '<div data-' + scope.config.display + '></div>';
        }

        elementHTML = $compile(elementHTML)(scope);
        element.html(elementHTML);
      }
    }
  }
})();
