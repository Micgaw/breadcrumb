'use strict';

angular.module('myApp', ['breadcrumb']);

angular.module('myApp', ['breadcrumb']).controller('MainCtrl', function($scope,serviceBreadcrumb) {

    function newAction(text,text2){
        console.log(text);
        console.log(text2);
    }
    $scope.newAction = newAction;

    function setAction(){
        serviceBreadcrumb.setNewActionToStep(5,newAction,["NEW ACTION!","NEW TEXT!"]);
    }
    $scope.setAction = setAction;

});

angular.module('myApp').directive('breadcrumb', function(){

    return {
        restrict: 'A',
        templateUrl: 'breadcrumb/breadcrumb.html'
    }
});