(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckerController', LunchCheckerController);

LunchCheckerController.$inject = ['$scope'];
function LunchCheckerController($scope) {
  $scope.lunch = "";
  //$scope.items = '';
  //$scope.numitems = 0;
  $scope.message = '';
  $scope.myColor = 'black';
  $scope.myBdColor = 'lightgrey';

  $scope.checkLunch = function() {
    console.log("checkLunch() has been called")

    // Split lunch into items
    var items = '';
    if ($scope.lunch != '') {
      items = $scope.lunch.split(",");
    };

    // Determine the number of items
    // $scope.numitems = $scope.items.length;
    var cnt = 0;
    for (var i in items) {
      //console.log(items[i].length);
      if (items[i].length > 0) {
        cnt += 1;
      };
    };

    //$scope.numitems = cnt;
    //$scope.items = items;

    // Set default color
    $scope.myColor = 'green';
    $scope.myBdColor = 'green';

    // Set message based on number of items
    if (cnt > 3) {
      $scope.message = "Too much!";
    } else if (cnt == 0) {
      $scope.myColor = 'red';
      $scope.myBdColor = 'red';
      $scope.message = "Please enter data first.";
    } else {
      $scope.message = "Enjoy!";
    };
  };
}

})();
