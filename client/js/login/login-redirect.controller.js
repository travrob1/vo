'use strict';
//NOTE: This controller is only ever use for social logins.  Local longins are managed inside the register.controller.js

/*global angular, _ */
angular.module('app')
    .controller('loginRedirectCtrl',function($rootScope, $scope, $state, $location, config, state){
            if (!_.has($rootScope, 'authenticatedUser.username') || _.get($rootScope, 'authenticatedUser.created') === _.get($rootScope, 'authenticatedUser.modified')) {
                state.ui.firstTimeLoggedIn = true;
                $state.transitionTo('setUsername');
            } else if (state.ui.comeBackUrl){
                $location.path(state.ui.comeBackUrl);
            }
            else {
                $state.transitionTo('questions');
            }
        

});