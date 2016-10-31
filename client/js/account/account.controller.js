'use strict';
/*global angular, $ */
angular.module('app').controller('accountCtrl',function($scope, $state, $http, AuthService, Upload, $timeout, cropPubSub){
    $scope.connectLocal = undefined;
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
    $scope.rank = {};
    $scope.rank.selected = '';
    $scope.rank_list = [
        {'level': 'E1','rank': 'Private', 'url': ''},
        {'level': 'E2','rank': 'Private E-2', 'url': 'images/insignia/army/e2.gif'},
        {'level': 'E3','rank': 'Private First Class', 'url': 'images/insignia/army/e3.png'},
        {'level': 'E4','rank': 'Corporal', 'url': 'images/insignia/army/e4-cpl.png'},
        {'level': 'E4','rank': 'Specialist', 'url': 'images/insignia/army/e4-spc.png'},
        {'level': 'E5','rank': 'Sergeant', 'url': 'images/insignia/army/e5.png'},
        {'level': 'E6','rank': 'Staff Sergeant', 'url': 'images/insignia/army/e6.png'},
        {'level': 'E7','rank': 'Sergeant First Class', 'url': 'images/insignia/army/e7.png'},
        {'level': 'E8','rank': 'Master Sergeant', 'url': 'images/insignia/army/e8-msg.png'},
        {'level': 'E8','rank': 'First Sergeant', 'url': 'images/insignia/army/e8-1sg.png'},
        {'level': 'E9','rank': 'Sergeant Major', 'url': 'images/insignia/army/e9-sgm.png'},
        {'level': 'E9','rank': 'Command Sergeant Major', 'url': 'images/insignia/army/e9-csm.png'},
        {'level': 'E9','rank': 'Sergeant Major of the Army', 'url': 'images/insignia/army/e9-sma.png'},
        {'level': 'E9','rank': 'Sergeant Major of the Army', 'url': 'images/insignia/army/e9-sma.png'},
        {'level': 'W1','rank': 'Warrant Officer 1', 'url': 'images/insignia/army/w1.png'},
        {'level': 'W2','rank': 'Chief Warrant Officer 2', 'url': 'images/insignia/army/w2.png'},
        {'level': 'W3','rank': 'Chief Warrant Officer 3', 'url': 'images/insignia/army/w3.gif'},
        {'level': 'W4','rank': 'Chief Warrant Officer 4', 'url': 'images/insignia/army/w4.gif'},
        {'level': 'W5','rank': 'Chief Warrant Officer 5', 'url': 'images/insignia/army/w5.gif'},
        {'level': 'O1','rank': 'Second Lieutenant', 'url': 'images/insignia/officers/o1.png'},
        {'level': 'O2','rank': 'First Lieutenant', 'url': 'images/insignia/officers/o2.png'},
        {'level': 'O3','rank': 'Captain', 'url': 'images/insignia/officers/o3.png'},
        {'level': 'O4','rank': 'Major', 'url': 'images/insignia/officers/o4.png'},
        {'level': 'O5','rank': 'Lieutenant Colonel', 'url': 'images/insignia/officers/o5.png'},
        {'level': 'O6','rank': 'Colonel', 'url': 'images/insignia/officers/o6.png'},
        {'level': 'O7','rank': 'Brigadier General', 'url': 'images/insignia/officers/o7.png'},
        {'level': 'O8','rank': 'Major General', 'url': 'images/insignia/officers/o8.png'},
        {'level': 'O9','rank': 'Lieutenant General', 'url': 'images/insignia/officers/o9.png'},
        {'level': 'O10','rank': 'General', 'url': 'images/insignia/officers/o10.png'},
    ];
    

});