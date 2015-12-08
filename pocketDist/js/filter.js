var myFilter = angular.module("myFilter", []);

myFilter.filter('upZeroOrNot', function() {
    return function(item) {
        if (item == 0) {
            return '负';
        } else if (item == 1) {
            return '正';
        } else {
            return '有问题';
        }
      
    };
});