angular
  .module('app')
  .directive('pie', ['$compile', 'metrics', pieDirective]);

function pieDirective ($compile, metrics) {
  'use strict';

  PieController.$inject = ['$scope', '$element', '$attrs'];

  return {
    restrict : 'AE',
    controllerAs: 'pie',
    controller : PieController,
    templateUrl : '/directives/pod/pie/pie.directive.html',
    link : link
  };

  function link (scope, instanceElement, instanceAttributes) {
    instanceElement.on('$destroy', function () {
      // $interval.cancel(timeoutId);
    });
  }

  function PieController ($scope, $element, $attrs) {
    this.metric = metrics[$scope.config.metric];
  }
}
