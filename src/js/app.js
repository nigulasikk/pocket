/**
 * Created by qkk on 14-9-19.
 */
// 定义一个模块
var angularApp = angular.module('ngApp', ['ngRoute', 'ngControllers']);

angularApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/list', {
        templateUrl: 'tmpls/remainList.html',
        // template: '<h2>We are home</h2>',
        controller: 'RemainListControler'
    }).
    when('/remainDetail/:rid', {
        templateUrl: 'tmpls/remainDetail.html',
        controller: 'RemainDetailControler'
    }).
     when('/addRemain', {
        templateUrl: 'tmpls/addRemain.html',
        controller: 'RemainDetailControler'
    }).
    otherwise({
        redirectTo: '/list'
    });
}]);