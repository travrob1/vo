'use strict';
/*global angular, $, _*/
angular.module('app').controller('accountCtrl',function($scope, $state, $http, $parse, AuthService, Upload, $timeout, cropPubSub, rankList){
    $scope.connectLocal = undefined;
    function populateUserInfo(u) {
        $scope.user.name = u.username;
        $scope.user.email = u.email;
    }

    // $timeout(function () {
    //     _.set($scope, 'profile.militaryRank.rank', 'First Sergeant');
    //     _.set($scope, 'profile.militaryBranch', 'airForce');
    //     _.set($scope, 'profile.education', 'less than highschool');
    //     var rankIdx = _.findIndex(rankList[$scope.profile.militaryBranch], {rank: $scope.profile.militaryRank.rank});
    //     $scope.profile.militaryRank.level = rankList[$scope.profile.militaryBranch][rankIdx].level;
    //     $scope.profile.militaryRank.url = rankList[$scope.profile.militaryBranch][rankIdx].url;
    //     $scope.$digest();
    // },500);

    $scope.user = {};
    $scope.userPasswords = {};
    $scope.profile = {};


    $scope.photo = $scope.$root.authenticatedUser.photo || '/images/avatar.png';
    $scope.educationOptions = ['less than highschool', 'highschool or equivalent', 'associates degree', 'bachelor of arts', 'bachelor of science', 'masters', 'doctorate or greater'];
    
    $scope.userUpdate = function(){
        AuthService.userUpdate($scope.$root.authenticatedUser).then(function(){
            var method = $state.current.url === '/set-username' ? 'post': 'put';

            $http[method]('/profiles',{
                'rank': $scope.profile.militaryRank.rank,
                'education': $scope.profile.education,
                'militaryBranch': $scope.profile.militaryBranch,
                'userId': $scope.authenticatedUser._id
            });
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

    $scope.showLinkForm = function(){
        $scope.connectLocal = true;
    };

    $scope.updatepassword = function(){
        $http.post('/updatepassword', {
            existing: $scope.newPass.existing,
            new: $scope.newPass.new,
            newConf: $scope.newPass.newConf
        }).then(function(res){
            if(res.data.notification){
                $scope.$root.notification = res.data.notification;
            }
        });
    };

    $scope.disabled = undefined;
   

    $scope.$watch('profile.militaryBranch', function(val, oldVal){
        if (val){
            $scope.rank_list = rankList[val];
            if(oldVal){
                $scope.profile.militaryRank = '';
            }


        }else {
            $scope.rank_list = undefined;
        }
    });
    

});