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
        getResources : getResources,
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

    function getResources () {
      var
        feedRequest = {},
        widgetDisplayList,
        excludedServices,
        excludedStatuses,
        configData,
        statusTodayConfigData,
        statusYesterdayConfigData,
        serviceTodayConfigData,
        serviceYesterdayConfigData;

      // todo: inject accountNumber contractNumbers

      // Derive exclusions from permissions
      excludedServices = permissions.getExcludedServices();
      excludedStatuses = permissions.getExcludedStatuses();

      widgetDisplayList = widget.displayList.get();

      configData = {
        accountNumber : 133242,
        contractNumber : 3452
      };
      if (excludedStatuses.length) {
        configData.excludedStatuses = excludedStatuses;
      }
      if (excludedServices.length) {
        configData.excludedServices = excludedServices;
      }

      // if status today required (by widgets)
      statusTodayConfigData = angular.copy(configData);
      statusTodayConfigData.expectedDeliveryDate = time.TODAY;
      feedRequest.statusToday = {
        url : config.api.base + config.api.metrics.statusToday,
        data : statusTodayConfigData
      };

      // if status yesterday required
      statusYesterdayConfigData = angular.copy(configData);
      statusYesterdayConfigData.expectedDeliveryDate = time.YESTERDAY;
      feedRequest.statusYesterday = {
        url : config.api.base + config.api.metrics.statusYesterday,
        data : statusYesterdayConfigData
      };

      // if service today required
      serviceTodayConfigData = angular.copy(configData);
      serviceTodayConfigData.expectedDeliveryDate = time.TODAY;
      feedRequest.serviceToday = {
        url : config.api.base + config.api.metrics.serviceToday,
        data : serviceTodayConfigData
      };

      // if service yesterday required
      serviceYesterdayConfigData = angular.copy(configData);
      serviceYesterdayConfigData.expectedDeliveryDate = time.YESTERDAY;
      feedRequest.serviceYesterday = {
        url : config.api.base + config.api.metrics.serviceYesterday,
        data : serviceYesterdayConfigData
      };

      return feedRequest;
    }
  }
})();
