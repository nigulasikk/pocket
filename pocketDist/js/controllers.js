var ngControllers = angular.module('ngControllers', []);


ngControllers.controller("RemainListControler", function($scope) {
    $scope.remains = remainList.get();

    $scope.del = function(index) {
        console.log("删除：" + index);
        remainList.del(index);
        $scope.updateView();
    };
    $scope.showDetail = function(index) {
        window.location.href = "pocket.html#/detail/" + index;
    };
    $scope.updateView = function(index) {
        $scope.remains = remainList.get();

    };


});



ngControllers.controller("RemainDetailControler", function($scope, $routeParams) {
    var detailNo = $routeParams.rid;
    $scope.remainsDetail = remainList.getItem(detailNo);
    $scope.datetime = turnDate($scope.remainsDetail.day);



    $scope.edit = function(index, name, zhengfu) {};

});

ngControllers.controller("AddRemainControler", function($scope) {


    $scope.addDetails = items.get();

    // $scope.addDetails=

    $scope.addRemain = function() {
        remainList.add($scope.addDetails);
        console.log($scope.addDetails);
        window.location.hash="#/list";
    };

});


ngControllers.controller("AddItemsControler", function($scope) {
    $scope.itemList = items.get();

    $scope.addItem = function(name, zhengfu) {
        items.add(name, zhengfu);
        $scope.itemList = items.get();

    };
     $scope.del = function(index) {
        console.log("删除：" + index);
      items.del(index);
        $scope.itemList = items.get();
       
    };

});