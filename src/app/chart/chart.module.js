(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name chart
   * @description
   *   Chart module.
   */
  angular.module('chart', []);
})();

angular
  .module('chart')
  .factory('d3', d3Service);

function d3Service () {
  'use strict';

  return d3;
}
