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

    var
      feed = {
        // Methods.
        getFeedType : newGetFeedType(),

        // Constants.
        STATUS : 'STATUS',
        SERVICE : 'SERVICE'
    };

    return feed;

    function newGetFeedType () {
      /*
       index | bin | type     | day       | return
      -------+-----+----------+-----------+-----------------
       0     | 00  | status   | today     | statusToday
       1     | 01  | status   | yesterday | statusYesterday
       2     | 10  | service  | today     | serviceToday
       3     | 11  | service  | yesterday | serviceYesterday
      */
      var lookUpTruthTable = [
        'statusToday',
        'statusYesterday',
        'serviceToday',
        'serviceYesterday'
      ];

      return function getFeedType (day, type) {
        day = (day === time.TODAY) ? 0 : 1;

        // type = (type === feed.STATUS) ? 0 : 2;
        switch (type) {
          case feed.SERVICE:
            type = 2;
            break;

          case feed.STATUS:
          default:
            type = 0;
        }

        index = type + day;
        return lookUpTruthTable[index];
      }
    }
  }
})();
