var angularApp = angular.module('ngApp', []);

angularApp.controller("RemainListControler", function($scope) {
    $scope.remains = remainList.get();

    $scope.del = function(index) {
        console.log("删除：" + index);
    };
});