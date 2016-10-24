/*global angular, $ */
angular.module('app').filter('rankBranch', function(){
    return  function(val ){
        if(val){
            return ' in the ' + val;
        }else {
            return '';
        }
    };
});