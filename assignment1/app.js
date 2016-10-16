(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckerController', LunchCheckerController);

LunchCheckerController.$inject = ['$scope'];
function LunchCheckerController($scope) {
  $scope.lunch = "item1, item2, item3";
  $scope.items = '';
  $scope.numitems = 0;
  $scope.message = '';

  $scope.checkLunch = function() {
    console.log("checkLunch() has been called")

    // Split lunch into items
    if ($scope.lunch == '') {
      $scope.items = '';
    } else {
      $scope.items = $scope.lunch.split(",");
    }

    // Determine the number of items
    $scope.numitems = $scope.items.length;

    // Set message based on number of items
    if ($scope.numitems > 3) {
      $scope.message = "Too much!";
    } else if ($scope.numitems == 0) {
      $scope.message = "";
    } else {
      $scope.message = "Enjoy";
    }
  };
}

})();
