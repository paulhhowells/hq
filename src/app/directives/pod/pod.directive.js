(function() {
  'use strict';

  angular
    .module('app')
    .directive('pod', ['$compile', podDirective]);

  function podDirective ($compile) {
    return {
      restrict : 'AE',
      scope : {
        config : '=config'
      },
      compile : compile,
      controllerAs: 'pod',
      controller : ['$scope', PodController]
    };

    function compile (element, attributes) {
      var markup = {
        pie : '<pie></pie>',
        bar : '<div data-bar></div>'
      };

      return {
        post : postLink
      };

      function postLink (scope, element, attributes) {
        var $ = angular.element;
        var elementHTML = markup[scope.config.type];

        elementHTML = $compile(elementHTML)(scope);
        element.html(elementHTML);
      }
    }

    function PodController ($scope) {}
  }
})();
