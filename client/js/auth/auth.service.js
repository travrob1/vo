'use strict';

/*global angular, $, _ */

angular.module('app').factory('AuthService', function($rootScope, $http, $q, $location, config) {
    function race(promises) {
      var deferred = $q.defer();

      _.forEach(promises, function(promise) {
        $q.when(promise).then(deferred.resolve);
      });

      return deferred.promise;
    }


    function login(email, password) {
        var TWO_WEEKS = 60 * 60 * 24 * 7 * 2;
        // return FirepolUser
        //     .login({
        //         rememberMe: true
        //     }, {
        //         email: email.toLowerCase(),
        //         password: password,
        //         ttl: TWO_WEEKS
        //     })
        //     .$promise
        //     .then(function(response) {
        //         $rootScope.authenticatedUser = {
        //             id: response.user.id,
        //             tokenId: response.id,
        //             email: email,
        //             username: response.user.username
        //         };
        //         $('#loginForm').modal('hide');
        //     });
    }

    function logout() {
        function socialLogout() {
            return $http.get('/auth/logout');
        }
        function loopbackLogout() {
            // return FirepolUser
            //     .logout()
            //     .$promise;
        }
        return race([socialLogout(), loopbackLogout()])
        .then(function() {
                $rootScope.authenticatedUser = undefined;
                $location.path('/');
            });
    }

    function register(email, password, username) {

        // return FirepolUser
        //     .create({
        //         email: email.toLowerCase(),
        //         password: password,
        //         username: username
        //     })
        //     .$promise;
    }

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
        
        // if (configuration.bootstrapLogin) {
        //     return $http.get('auth/getCurrent')
        //     .then(function (res) {
        //         $rootScope.authenticatedUser = res.data.user;
        //         $rootScope.$broadcast('UserSetToScope');

        //     });
        // } else {
            // return FirepolUser.getCurrent(
            //     function(response) {
            //         console.log('res', response);
            //         $rootScope.authenticatedUser = {
            //             id: response.id,
            //             email: response.email,
            //             username: response.username
            //         };
            //     },
            //     function(error) {
            //         console.log('no logged in user');
            //     }).$promise;
        // }
    }

    return {
        login: login,
        logout: logout,
        register: register,
        getCurrent: getCurrent
    };
});