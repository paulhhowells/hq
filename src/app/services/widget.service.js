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

  widgetService.$inject = ['feed'];

  function widgetService (feed) {
    var
      core = [],
      coreIndex = {},
      displayList = [],
      displayListIndex = {},
      service = {
        displayList : {
          get : getDisplayList,
          inc : displayListInc,
          dec : displayListDec
        },
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

    function addWidgetToCore (id) {
      var
        total,
        widget;

      if (!coreIndex.hasOwnProperty(id)) {
        widget = {
          id : id, // feed ID
          display : 'pie',
          selected : true
        };

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