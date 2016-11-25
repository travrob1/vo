/*global angular*/

angular.module('app')
.controller('marketingCtrl',function($scope, $timeout, config){

    $scope.search = function(){
        $scope.foo = [{title: 'some Title', content: 'This is some contetnerh lka fidsa dsa ioewiohg hlkga'}, {title: 'How can i get in a super awesome college', content: 'Contetnerh lka fids fds fds af dsa hlkhfs a hoiwquie kldsaa dsa ioewiohg hlkga'}];
        $scope.searchHeight = 88 * $scope.foo.length;
        $scope.hideHero = true;
    };
});