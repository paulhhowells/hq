(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name app.service:feed
   * @description
   *   Provides a model of the available feeds.
   *   Derived from permissions.
   */
  angular
    .module('app')
    .factory('feed', feedService);

  feedService.$inject = ['time', 'permissions', 'config', 'widget'];

  function feedService (time, permissions, config, widget) {
    };

    return feed;
  }
})();
