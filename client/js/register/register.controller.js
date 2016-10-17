/*global angular*/

angular.module('app')
.controller('registerCtrl',function($scope, $state,  AuthService, $location, state){
    $scope.photo = $scope.$root.authenticatedUser.photo || '/images/avatar.png';
    $scope.educationOptions = ['less than highschool', 'highschool or equivalent', 'associates degree', 'bachelor of arts', 'bachelor of science', 'masters', 'doctorate or greater'];
   
    $scope.userUpdate = function(){
        debugger
        AuthService.userUpdate($scope.$root.authenticatedUser).then(function(){
            $state.transitionTo('questions');
        });
    };

    $scope.changePhoto = function(){

    };


});