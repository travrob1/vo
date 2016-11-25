/*global angular, $ */
angular.module('app').filter('rankBranch', function(){
    return  function(val ){
        if(val){

            switch(val){
                case 'army':
                    return  ' in the Army';
                case 'airForce':
                    return ' in the Air Force';
                case 'coastGaurd':
                    return ' in the Coast Gaurd';
                case 'marines':
                    return ' in the Marines';
                case 'navy':
                    return ' in the Navy';
            }
        }else {
            return '';
        }
    };
});