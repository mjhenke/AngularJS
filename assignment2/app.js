(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

// To buy Controller
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyList = this;

  toBuyList.items = ShoppingListCheckOffService.getToBuyItems();

  // Function to move buy item from buy list to bought list
  toBuyList.buyItem = function(itemIndex) {
    ShoppingListCheckOffService.buyItem(itemIndex);
  }

  // Check if list empty, returning boolean
  toBuyList.empty = function() {
    return (toBuyList.items.length == 0 )
  }
}

// Already Bought Controller
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;

  boughtList.items = ShoppingListCheckOffService.getBoughtItems();

  // Check if list empty, returning boolean
  boughtList.empty = function() {
    return (boughtList.items.length == 0 )
  }
}

// Shopping list Service, singleton
function ShoppingListCheckOffService() {
  var service = this;

  // To buy item array
  var toBuyItems = [
    { name: "chocolate cookies", quantity: 10 },
    { name: "butter cookies", quantity: 1 },
    { name: "sugar cookies", quantity: 5 },
    { name: "mint cookies", quantity: 100 },
    { name: "peanut butter cookies", quantity: 11 }
  ];

  // Items bought array
  var boughtItems = []; // { name: "cookies", quantity: 10 } ];

  // return to buy list
  service.getToBuyItems = function() {
    return toBuyItems;
  };

  // return bought list
  service.getBoughtItems = function() {
    return boughtItems;
  };

  // Function to move buy item from buy list to bought list
  service.buyItem = function(itemIndex) {
    var item = toBuyItems[itemIndex];

    toBuyItems.splice(itemIndex, 1);
    boughtItems.push(item);
  };
}

})();
