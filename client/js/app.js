/*global angular, $*/
var app = angular.module('app', ['ui.router', 'ngResource', 'ui.validate', 'app.config', 'ngFileUpload', 'ngImgCrop']);

app.config( function($stateProvider, $urlRouterProvider) {
    var requireAuthUser = {
        authUser: function($rootScope, $q){
            if (!$rootScope.authenticatedUser){
                $q.reject('no auth user');
            }
        }
    };


    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'js/marketing/marketing.html',
            controller: 'marketingCtrl'
        }).state('home2', {
            url: '',
            templateUrl: 'js/marketing/marketing.html',
            controller: 'marketingCtrl'
        }).state('register', {
            url: '/register',
            templateUrl: 'js/register/register.html',
            controller: 'registerCtrl'
        }).state('setUsername', {
            url: '/set-username',
            templateUrl: 'js/register/set-username.html',
            controller: 'registerCtrl'
        }).state('about-us', {
            url: '/about-us',
            templateUrl: 'js/about-us/about-us.html',
            controller: 'globalCtrl'
        }).state('question', {
            url: '/question/:id',
            templateUrl: 'js/question/question-view.html',
            controller: 'questionViewCtrl'
        }).state('questions', {
            url: '/questions',
            templateUrl: 'js/question/question-list.html',
            controller: 'questionList'
        }).state('ask-question', {
            url: '/ask-question',
            templateUrl: 'js/question/question-create.html',
            controller: 'questionCreateCtrl'
        }).state('portfolio', {
            url: '/portfolio',
            templateUrl: 'js/portfolio/portfolio.html',
            controller: 'globalCtrl'
        }).state('career', {
            url: '/career',
            templateUrl: 'js/career/career.html',
            controller: 'globalCtrl'
        }).state('blog', {
            url: '/blog',
            templateUrl: 'js/blog/blog.html',
            controller: 'globalCtrl'
        }).state('blog-item', {
            url: '/blog-item',
            templateUrl: 'js/blog/blog-item.html',
            controller: 'globalCtrl'
        }).state('faq', {
            url: '/faq',
            templateUrl: 'js/faq/faq.html',
            controller: 'globalCtrl'
        }).state('pricing', {
            url: '/pricing',
            templateUrl: 'js/pricing/pricing.html',
            controller: 'globalCtrl'
        }).state('privacy', {
            url: '/privacy',
            templateUrl: 'js/terms-privacy/privacy.html',
            controller: 'globalCtrl'
        }).state('terms', {
            url: '/terms',
            templateUrl: 'js/terms-privacy/terms.html',
            controller: 'globalCtrl'
        }).state('contact', {
            url: '/contact',
            templateUrl: 'js/contact-us/contact.html',
            controller: 'globalCtrl'
        }).state('404', {
            url: '/404',
            templateUrl: 'js/404/404.html',
            controller: 'globalCtrl'
        }).state('user-profile', {
            url: '/user-profile',
            templateUrl: 'js/user-profile/user-profile.html',
            controller: 'profileCtrl',
            authenticate: true
        }).state('account', {
            url: '/account',
            templateUrl: 'js/account/account.html',
            controller: 'accountCtrl',
            authenticate: true
        }).state('login-redirect', {
            url: '/login-redirect',
            controller: 'loginRedirectCtrl',
            authenticate: true
        });

        $urlRouterProvider.otherwise('404');
}) 
.run(function($rootScope, $state, $timeout, AuthService) {
    $rootScope.$on('$stateChangeStart', function(event, next) {
        $('html body').scrollTop( 0 );
        // redirect to login page if not logged in
        if (next.authenticate && !$rootScope.authenticatedUser) {
            // the user might be logged in, but authenticatedUser has not been set to scope on a page refresh
            AuthService.getCurrent()
                .catch(function(){
                    event.preventDefault(); //prevent current page from loading
                    $state.go('home');
                });
        }
    });
});

app.controller('globalCtrl', function($scope, $location, $http, AuthService, state){
    AuthService.getCurrent();
    var theState = window.sessionStorage.getItem('state.ui');
    if (theState) {
        _.merge(state.ui, JSON.parse(theState));
        window.sessionStorage.removeItem('state.ui');
    }


    $scope.login = function(email, pw){
        AuthService.login(email, pw)
            .then(function(){
                if(state.ui.comeBackUrl){
                    $location.path(state.ui.comeBackUrl);
                }else {
                    $location.path('/questions');
                }
            })
            .catch(function(err){
                $scope.loginFailed = err.data.error.message;
                
            });
    };

    $scope.logout = function(){
        AuthService.logout()
            .then(function(){
                $location.path('/');
            });
    };
    $scope.mobileCollapseNav = function(){
        $('.navbar-collapse').collapse('hide');
    };
    $scope.registerFromModal = function(){
        $('.modal').modal('hide');
    };


});