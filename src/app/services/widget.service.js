(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name app.service:widget
   * @description
   *   Provides an API for the widgets model.
   */
  angular
    .module('app')
    .factory('widget', widgetService);

  widgetService.$inject = ['time'];

  function widgetService (time) {
    var
      core = [],
      coreIndex = {},
      displayList = [],
      displayListIndex = {},
      service = {
        DISPLAY : {
          FILLER : 'FILLER',
          PIE : 'PIE',
          BAR : 'BAR',
          GAUGE : 'GAUGE'
        },
        displayList : {
          get : getDisplayList,
          getWithFiller : getDisplayListWithFiller,
          inc : displayListInc,
          dec : displayListDec
        },
        displayOptions : [
          { id : 'pie', label : 'Pie' },
          { id : 'bar', label : 'Bar' },
          { id : 'gauge', label : 'Gauge' }
        ],
        filter : {
          getSelected : getFilterSelected,
          getUnselected : getFilterUnselected
        },
        core : {
          get : getCore
        },
        selectionChange : selectionChange
      };

    // Process feed into core.
    angular.forEach(feed, function (value, key) {
      addWidgetToCore(key);
    });

    updateDisplayList();

    return service;

    // Called when selection changes.
    function selectionChange (id) {
      // Update displayList.
      updateDisplayList(id);
    }

    function newWidget (widgetId) {
      return {
        id : widgetId,
        display : service.displayOptions[0].id,
        selected : true,
        name : 'Widget Name ' + widgetId,
        request : {
          id : null, // To be set by directive.
          date : time.TODAY,
          services : [],
          statuses : [],
          excludedServices : [],
          excludedStatuses : [],
          type : 'TYPE'
        }
      };
    }

    function addWidgetToCore (id) {
      var
        total,
        widget;

      if (!coreIndex.hasOwnProperty(id)) {
        widget = newWidget(id);
        total = core.push(widget);
        coreIndex[id] = total - 1;
      }
    }

    function updateDisplayList (id) {
      var
        i,
        coreLength = core.length,
        widget;

      if (id) {
        // Add or remove widget from displayList as required.
        widget = core[coreIndex[id]];
        reconcileWidget(widget);
      }
      else {
        // Add or remove widgets from displayList as required.
        for (i = 0; i < coreLength; i++) {
          reconcileWidget(core[i]);
        }
      }

      function reconcileWidget (widget) {
        // Conform displayListIndex to selection status of widgets in list.
        if (widget.selected) {
          // Add to selectedList, if not in selectedList.
          if (!displayListIndex.hasOwnProperty(widget.id)) {
            addWidgetToDisplayList(widget);
          }
        }
        else {
          // Remove from displayListIndex, if in displayList.
          if (displayListIndex.hasOwnProperty(widget.id)) {
            removeWidgetFromDisplayList(widget.id);
          }
        }
      }
    }

    function addWidgetToDisplayList (widget) {
      var total = displayList.push(widget);

      displayListIndex[widget.id] = total - 1;
    }

    function removeWidgetFromDisplayList (id) {
      var index = displayListIndex[id];

      displayList.splice(index, 1);
      delete displayListIndex[id];
      updateIndexedList(displayList, displayListIndex, index);
    }

    function updateIndexedList (list, indexedList, start) {
      var
        i,
        id,
        listLength = list.length;

      for (i = start || 0; i < listLength; i++) {
        id = list[i].id;
        indexedList[id] = i;
      }
    }

    function displayListInc (id) {
      var
        index,
        widget;

      if (displayListIndex.hasOwnProperty(id)) {
        index = displayListIndex[id];

        // Ensure that widget may be incremented within displayList.
        if (index < displayList.length - 1) {

          // Move widget in displayList.
          widget = displayList.splice(index, 1)[0];
          displayList.splice(index + 1, 0, widget);

          // Update displayListIndex to match displayList.
          updateIndexedList(displayList, displayListIndex, index);
        }
      }
    }

    function displayListDec (id) {
      var
        index,
        widget;

      if (displayListIndex.hasOwnProperty(id)) {
        index = displayListIndex[id];

        // Ensure that widget may be incremented within displayList.
        if (index > 0) {

          // Move widget in displayList.
          widget = displayList.splice(index, 1)[0];
          displayList.splice(index - 1, 0, widget);

          // Update displayListIndex to match displayList.
          updateIndexedList(displayList, displayListIndex, index - 1);
        }
      }
    }

    function getDisplayList () {
      return displayList;
    }

    function getDisplayListWithFiller () {
      var
        fill = { display : service.DISPLAY.FILLER },
        filler = [
          fill,
          fill,
          fill
        ];

      return [].concat(getDisplayList(), filler);
    }

    function getCore () {
      return core;
    }

    function getFilterSelected () {
      return filterListBySelection(core, true);
    }

    function getFilterUnselected () {
      return filterListBySelection(core, false);
    }

    function filterListBySelection (list, selection) {
      var
        filtered = [],
        i,
        listLength = list.length;

      for (i = 0; i < listLength; i++) {
        sortSelectionIterator(list[i]);
      }

      return filtered;

      function sortSelectionIterator (widget) {
        if (widget.selected === selection) {
          filtered.push(widget);
        }
      }
    }
  }
})();
