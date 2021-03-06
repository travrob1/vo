'use strict';
/*global angular, $, _*/
angular.module('app').controller('accountCtrl',function($scope, $state, $http, $parse, AuthService, Upload, $timeout, cropPubSub, rankList){
    $scope.connectLocal = undefined;
    var method;

    $http.get('/profile').then(function (res) {
        if(res.data.length){
            var profile = res.data[0];
            _.set($scope, 'profile.militaryRank.rank', profile.rank);
            _.set($scope, 'profile.militaryBranch', profile.militaryBranch);
            _.set($scope, 'profile.education', profile.education);
            if($scope.profile.militaryBranch && $scope.profile.militaryRank.rank){
                var rankIdx = _.findIndex(rankList[$scope.profile.militaryBranch], {rank: $scope.profile.militaryRank.rank});
                $scope.profile.militaryRank.level = rankList[$scope.profile.militaryBranch][rankIdx].level;
                $scope.profile.militaryRank.url = rankList[$scope.profile.militaryBranch][rankIdx].url;
            }
            
            if(!$scope.$$phase){
                $scope.$digest();
            }

            method = 'put';
        }else {
            method = 'post';

        }
    });

    $scope.user = {};
    $scope.userPasswords = {};
    $scope.profile = {};


    $scope.photo = $scope.$root.authenticatedUser.photo || '/images/avatar.png';
    $scope.educationOptions = ['less than highschool', 'highschool or equivalent', 'associates degree', 'bachelor of arts', 'bachelor of science', 'masters', 'doctorate or greater'];
    
    $scope.userUpdate = function(){
        AuthService.userUpdate($scope.$root.authenticatedUser).then(function(){
            $http[method]('/profile',{
                'rank': _.get($scope,'profile.militaryRank.rank'),
                'education': _.get($scope,'profile.education'),
                'militaryBranch': _.get($scope,'profile.militaryBranch'),
                'userId': _.get($scope,'authenticatedUser._id')
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