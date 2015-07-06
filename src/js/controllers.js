var ngControllers = angular.module('ngControllers', []);


ngControllers.controller("RemainListControler", function($scope) {
    $scope.remains = remainList.get();

    $scope.del = function(index) {
        // TODO:
        console.log("删除：" + index);
    };
});



ngControllers.controller("RemainDetailControler", function($scope) {

    $scope.remainsDetail = remainList.getItem(2);
    $scope.datetime = turnDate($scope.remainsDetail.day);

    $scope.edit = function(index, name, zhengfu) {
        items.add();
    };

});