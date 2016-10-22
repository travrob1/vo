'use strict';
/*global angular, $ */
angular.module('app').controller('accountCtrl',function($scope, $state, $http, AuthService, Upload, $timeout, cropPubSub){
    
    function populateUserInfo(u) {
        $scope.user.name = u.username;
        $scope.user.email = u.email;
    }

    $scope.user = {};
    $scope.userPasswords = {};


    $scope.photo = $scope.$root.authenticatedUser.photo || '/images/avatar.png';
    $scope.educationOptions = ['less than highschool', 'highschool or equivalent', 'associates degree', 'bachelor of arts', 'bachelor of science', 'masters', 'doctorate or greater'];
    
    $scope.userUpdate = function(){
        AuthService.userUpdate($scope.$root.authenticatedUser).then(function(){
            //show something
        });
    };

    $scope.upload = function (dataUrl, name) {
        $('#cropImgModal').modal('hide');
        $('#theFileButton').text('Loading...');
        Upload.upload({
            url: 'avatar-upload',
            data: {
                file: Upload.dataUrltoBlob(dataUrl, name)
            },
        }).then(function (response) {
            $timeout(function () {
                $scope.$root.authenticatedUser = response.data;
                $scope.result = response.data;
                $('#theFileButton').text('Change Photo');

            });
        }, function (response) {
            if (response.status > 0) {
                $scope.errorMsg = response.status + ': ' + response.data;
            }
        }, function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        });
    };

    $scope.callModal = function(val){
        if(val){
            $('#cropImgModal').modal('show');
            var myEvent = new cropPubSub();
            $timeout(function(){
                myEvent.trigger('area-move');
            },200);
        }
    };

});