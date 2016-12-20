(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItems);

function FoundItems() {
  var ddo = {
    templateUrl: 'foundItems.html'
  };

  return ddo;
}

// To buy Controller
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var controller = this;

  controller.searchTerm = "";

  controller.narrowItDown = function() {
    // Clear variables for new search
    controller.found = "";
    controller.errorMessage = ""

    // Handle empty searchTerm
    if( controller.searchTerm == "" ) {
      controller.errorMessage = "Nothing Found."
      return;
    }

    // Process search
    var promise = MenuSearchService.getMatchedMenuItems(controller.searchTerm);
    promise.then(function(response) {
      controller.found = response.data;
      if(controller.found.length == 0)
        controller.errorMessage = "Nothing Found.."
    })
    .catch(function(error) {
      console.log("Menu Search Failed.");
      controller.errorMessage = "Menu Search Failed.."
    })
  };

  controller.removeItem = function(itemIndex) {
    controller.found.splice(itemIndex, 1);
  };
}

// Shopping list Service, singleton
MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  // return
  service.getMatchedMenuItems = function(searchTerm) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function(results) {
      // process result and only keep items that match
      var foundItems = [];

      // Convert to lower case
      searchTerm = searchTerm.toLowerCase();

      // if searchTerm found in name or description add to found
      for(var i in results.data.menu_items) {
        var item = results.data.menu_items[i];  // current item

        // search if current item contains search term
        if(item.name.toLowerCase().includes(searchTerm)
           || item.description.toLowerCase().includes(searchTerm))
          foundItems.push(item);      // Stroe item
      }

      results.data = foundItems;

      // return processed items
      return results; //foundItems;
    });

    return response;
  };
}

})();
