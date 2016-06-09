(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name app.service:user
   * @description
   *   Provides a model of the user.
   */
  angular
    .module('app')
    .factory('user', user);

  function user () {
    var user = {};

    return user;
  }
})();
