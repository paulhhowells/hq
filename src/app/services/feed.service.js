(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name app.service:feed
   * @description
   *   Provides a model of the available feeds.
   */
  angular
    .module('app')
    .factory('feed', feedService);

  function feedService () {
    };

    return feed;
  }
})();
