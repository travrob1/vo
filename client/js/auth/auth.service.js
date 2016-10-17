'use strict';

/*global angular, $, _ */

angular.module('app').factory('AuthService', function($rootScope, $http, $q, $location, config) {

    function getCurrent() {
        return $q (function(resolve, reject){
            if(config.user){
                $rootScope.authenticatedUser = config.user;
                $rootScope.$broadcast('UserSetToScope');

                return resolve();
            }else {
                return reject();
            }
        });
    }

    function userUpdate(theUser){
        return $http.post('/user-update', {
            user: theUser
        });
    }

    return {
        getCurrent: getCurrent,
        userUpdate: userUpdate
    };
});