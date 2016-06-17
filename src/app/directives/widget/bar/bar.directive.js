angular
  .module('app')
  .directive('bar', ['$compile', 'metrics', barDirective]);

function barDirective ($compile, metrics) {
  'use strict';

  return {
    restrict : 'AE',
    controllerAs: 'bar',
    controller : ['$scope', '$element', '$attrs', BarController],
    templateUrl : '/directives/widget/bar/bar.directive.html',
    link : link
  };

  function link (scope, instanceElement, instanceAttributes) {
    instanceElement.on('$destroy', function () {
      // $interval.cancel(timeoutId);
    });
  }

  // Best Practice: use controller when you want to expose an API to other directives. Otherwise use link.
  function BarController ($scope, $element, $attrs) {
    this.metric = metrics[$scope.config.metric];
  }
}
