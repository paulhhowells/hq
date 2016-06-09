(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name app.config
   * @description
   *   App configuration.
   */
  angular
    .module('app')
    .config(config);

  config.$inject = ['$compileProvider'];

  function config ($compileProvider) {

    // Gulp will set debugInfoEnabled to false when generating a minified
    // file for use in production.
    $compileProvider.debugInfoEnabled(true);
  }
})();
