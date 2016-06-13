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
    var feed = {
      one : {
        name : 'A',
        type : 'mono',
        url : '',
        selected : false
      },
      two : {
        name : 'B',
        type : 'mono',
        url : '',
        selected : false
      },
      three : {
        name : 'C',
        type : 'mono',
        url : '',
        selected : false
      },
      fish : {
        name : 'D',
        type : 'mono',
        url : '',
        selected : false
      },
      pig : {
        name : 'E',
        type : 'mono',
        url : '',
        selected : false
      }
    };

    return feed;
  }
})();
