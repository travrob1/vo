'use strict';
/*global angular, $ */

angular.module('app').directive('voMarketing', function($window){
    return {
        restrict: 'AE',
        link: function(scope, elem, attrs){

            $window.onresize = function(event) {
                if($window.innerWidth < 767){
                     $('#search-section').insertBefore('#hero');
                }else {
                    $('#hero').insertBefore('#search-section');
                }
            };

            $window.onresize();
        }
    };
}); 