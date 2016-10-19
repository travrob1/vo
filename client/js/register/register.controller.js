/*global angular*/

angular.module('app')
.controller('registerCtrl',function($scope, $state,  AuthService, $location, state, Upload, $timeout){
    $scope.photo = $scope.$root.authenticatedUser.photo || '/images/avatar.png';
    $scope.educationOptions = ['less than highschool', 'highschool or equivalent', 'associates degree', 'bachelor of arts', 'bachelor of science', 'masters', 'doctorate or greater'];
   
    $scope.userUpdate = function(){
        AuthService.userUpdate($scope.$root.authenticatedUser).then(function(){
            $state.transitionTo('questions');
        });
    };


    $scope.uploadFiles = function(file, errFiles) {
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
                url: 'avatar-upload',
                data: {file: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    $scope.$root.authenticatedUser = response.data;
                    $scope.$apply();
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * 
                                         evt.loaded / evt.total));
            });
        }   
    };


});