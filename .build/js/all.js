/*global angular, $*/
var app = angular.module('app', ['ui.router', 'ngResource', 'ui.validate']);

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
'use strict';
/*global angular */
angular.module('app').controller('accountCtrl',function($scope, FirepolUser, $http){
    function populateUserInfo(u) {
        $scope.user.name = u.username;
        $scope.user.email = u.email;
    }

    $scope.user = {};
    $scope.userPasswords = {};
    FirepolUser.findById({id: $scope.$root.authenticatedUser.id}).$promise
    .then(populateUserInfo, console.error);
    
    $scope.updateAccount = function () {
        FirepolUser.prototype$updateAttributes({id: $scope.$root.authenticatedUser.id},
            {username: $scope.user.name,
            email: $scope.user.email
            });
    };

    $scope.updatePassword = function() {
        function updatedPassword(s, e) {
            console.log('updatePassword', s, e);
        }
        $http.put('/api/FirepolUsers/updatePassword', $scope.userPasswords)
            .then(updatedPassword);
    };
});
'use strict';

/*global angular, $, _ */

angular.module('app').factory('AuthService', function($rootScope, $http, $q, $location) {
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
'use strict';
//NOTE: This controller is only ever use for social logins.  Local longins are managed inside the register.controller.js

/*global angular, _ */
angular.module('app')
    .controller('loginRedirectCtrl',function($rootScope, $scope, $state, $location, configuration, FirepolUser, state){
    if (configuration.bootstrapLogin){
        $scope.$on('UserSetToScope',function () {
            if (_.get($rootScope, 'authenticatedUser.profiles[0].created') === _.get($rootScope, 'authenticatedUser.profiles[0].modified')) {
                state.ui.firstTimeLoggedIn = true;
                $state.transitionTo('setUsername');
            } else if (state.ui.comeBackUrl){
                $location.path(state.ui.comeBackUrl);
            }
            else {
                $state.transitionTo('questions');
            }
        });


    }
});
/*global angular*/

angular.module('app')
.controller('marketingCtrl',function($scope){
   
});
'use strict';
/*global angular, document */

angular.module('app')
.directive('onFinishInjectSvgs', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    var mySVGsToInject = document.querySelectorAll('img.inject-me');

                     // Do the injection
                     SVGInjector(mySVGsToInject);
                });
            }
        }
    };
});
'use strict';

/* globals angular */

angular.module('app')
    .directive('postAnswer', postAnswer);

function postAnswer(){
    return {
        restrict: 'E',
        templateUrl: '/js/question/post-answer-template.html',
        link: function(scope, elem, attrs){
                
        }
    };
}
'use strict';

/* globals angular, _ */

angular.module('app')
    .factory('postApi', postApi);

function postApi($http) {
    return {
        create: create,
        findTidbitsByPostId: findTidbitsByPostId,
        getComments: getComments,
        getPostById: getPostById,
        postComment: postComment,
        getPosts: getPosts,
        postTidbit: postTidbitsByPostId

    };
    function create(questionObj) {
        return $http.post('/api/Posts',{
            'title': questionObj.title
            })
        .then(sendTidbit);

        function sendTidbit(res) {
            var theRes = res;
            return $http.post('/api/Posts/'+res.data.id+'/Tidbit',{
                'content': questionObj.details,
                'name': questionObj.username
            }).then(function(tbRes) {
                return _.merge(theRes, tbRes);
            });
        }
    }

    function findTidbitsByPostId(id){
        return $http.get('/api/Posts/'+id + '/Tidbit');
    }

    function postTidbitsByPostId(postId, content, username){
        return $http.post('/api/Posts/'+postId+'/Tidbit',{
            'content': content,
            'name': username
        });
    }

    function getComments(tidbitId){
        return $http.get('/api/Tidbits/' +tidbitId+ '/Comments');
    }

    function postComment(tidbitId, data){
        return $http.post('/api/Tidbits/' +tidbitId+ '/Comments', data);
    }

    function getPosts(){
        return $http.get('/api/Posts/');
    } 
    function getPostById(id){
        return $http.get('/api/Posts/'+ id);
    }
}
'use strict';

/* globals angular */

angular.module('app')
    .directive('questionComments', questionComments);

function questionComments(){
    return {
        restrict: 'E',
        templateUrl: '/js/question/comments-template.html',
        link: function(scope, elem, attrs){
        }
    };
}
'use strict';

/* globals angular, _ */

angular.module('app')
    .controller('questionCreateCtrl', questionCreate);

function questionCreate($scope, $q, $stateParams, $timeout, $location, $http, postApi, state) {
    $scope.createQuestion = function(){
        postApi.create(_.merge({}, $scope.question, $scope.$root.authenticatedUser))
        .then(function(res){
            state.ui.postTitle = res.data.title;
            $location.path('question/' + _.get(res, 'data.postId'));
        }).catch(function(e){
            console.log('error happend on create question', e);
        });
    };
}
'use strict';

/* globals angular */

angular.module('app')
    .controller('questionList', questionList);

function questionList($scope, postApi) {
   postApi.getPosts()
    .then(function(res){
        $scope.postsList = res.data;
    });
    
}
'use strict';

/* globals angular, _ */

angular.module('app')
    .controller('questionViewCtrl', questionView);

function questionView($scope, $q, $stateParams, $timeout, postApi, state) {
    $scope.activeComment = {
        id: undefined,
        text: ''
    };
    var postId = $stateParams.id;
    var authUser = $scope.$root.authenticatedUser;

    if(state.ui.postTitle){
        $scope.postTitle = state.ui.postTitle;
    }else {
        postApi.getPostById(postId)
            .then(function(res){
                $scope.postTitle = res.data.title;
            });
    }
    postApi.findTidbitsByPostId(postId)
        .then(function(res){
            _.forEach(res.data, buildTidbit);
    });
    
    $scope.tidbits = [];
    function buildTidbit(tidbit) {
        $scope.tidbits.push(tidbit);
        getComments(tidbit);
    }
    function getComments(tidbit){
        postApi.getComments(tidbit.id)
        .then(function(res){
            if ( ! $scope.commentsByTidbit) {
                $scope.commentsByTidbit = {};
            }
            var comments = res.data;
            $scope.commentsByTidbit[tidbit.id] = sortComments(comments);
            console.log($scope.commentsByTidbit);
        });
    }
    function sortComments(theComments) {
        var comments = _.sortBy(theComments, function(a) {
            return a.time;
        });
        var rootComments = _.filter(comments, function(c) {
            return !c.inReferenceToCommentId;
        });
        _.forEach(rootComments, function(c) {
            c.indent = 0;
            c.childCount = 0;
        });
        var otherComments = _.differenceBy(comments, rootComments, function(c) {
            return c.id;
        });
        _.forEach(otherComments, function(c) {
            var parentIndex = _.findIndex(rootComments, function(cr) {
                    return cr.id === c.inReferenceToCommentId;
                }),
                parent = rootComments[parentIndex];
            c.indent = parent.indent + 33;
            rootComments.splice(parentIndex + 1 + parent.childCount, 0, c);
            for (var p = parent; p; p = p.parent) {
                p.childCount += 1;
            }
            c.childCount = 0;
            c.parent = parent;
        });
        return rootComments;
    }

    function saveStateToSession(){
        state.ui.comeBackUrl = '/question/' + postId;
        state.ui.returnToQuestionScope = {
            activeComment: $scope.activeComment,
            odds: $scope.odds,
            certainty: $scope.certainty
        };
        var stringifiedData = JSON.stringify(state.ui);

        window.sessionStorage.setItem('state.ui', stringifiedData);
        $('.modal').modal('show');

    }

    $scope.postComment = function(tidbit, commentId) {
        if(!authUser){
            saveStateToSession();
        }else {
            postApi.postComment(tidbit.id, {
                'text': $scope.activeComment.text,
                'inReferenceToCommentId': commentId,
                'name': authUser.username
            }).then(function(res) {
                $scope.activeComment = {
                    id: undefined,
                    text: ''
                };
                getComments(tidbit);
            });
        }
    };

    $scope.postTidbit = function(){
        if(!authUser){
            saveStateToSession();
        }else {
            postApi.postTidbit(postId, $scope.newTidbit, authUser.username)
                .then(function(res) {
                    
                $scope.tidbits.push(res.data);
                $scope.newTidbit = '';
            });
        }
    };

    $scope.replyToComment = function(commentId, e) {
        $scope.activeComment.id = commentId;
        $timeout(function() {
            e.target.parentNode.parentNode.getElementsByClassName('selectedCommentInput')[0].focus();
        }, 100);
    };

   
}
'use strict';

/*global angular */

angular.module('app')
    .filter('timeToWords', timeToWords);
/* todo put this in a factory */
function timeToWords() {
    return function(theTimeString) {
        var delta = Date.now() - Date.parse(theTimeString);
        var val;
        if ( delta < 60 * 1000)
            return 'seconds ago';
        else if ( delta < 60 * 60 * 1000) {
            val = trimNumber(delta / (60 * 1000));
            if (val === '1') {
                    return  + val + ' minute ago';
            } else {
                return  + val + ' minutes ago';
            }
        }
        else if ( delta < 24 * 60 * 60 * 1000) {
            val = trimNumber(delta / (60 * 60 * 1000));
            if (val === '1') {
                return val + ' hour ago';
            } else {
                return val + ' hours ago';
            }
        }
        else if ( delta < 30 * 24 * 60 * 60 * 1000) {
            val = trimNumber(delta / (24 * 60 * 60 * 1000));
            if (val === '1') {
                return val + ' day ago';
            } else {
                return val + ' days ago';
            }
        }
        else if ( delta < 12 * 30 * 24 * 60 * 60 * 1000) {
            val = trimNumber(delta / (30 * 24 * 60 * 60 * 1000));
            if (val === '1') {
                return val + ' month ago';
            } else {
                return val + ' months ago';
            }
        }
        else {
            val = trimNumber(delta / (12 * 30 * 24 * 60 * 60 * 1000));
            if (val === '1') {
                return val + ' year ago';
            } else {
                return val + ' years ago';
            }
        }
    };

    function trimNumber(num, post) {
            function err(msg) {
                throw msg;
            }
            if ( ! (num || num === 0.0) ) {
                err('trimNumber() requires one input parameter');
            }
            if (!post){
                post = 0;
            }
            
            var ret = '' + num;
            var decimalPos = ret.indexOf('.');
            if ( decimalPos > -1 ) {
                if ( post === 0 ) 
                    ret = ret.substr(0, decimalPos + post);
                else
                    ret = ret.substr(0, decimalPos + post + 1);
            }
            return ret;
        } 
}
/*global angular*/

angular.module('app')
.controller('registerCtrl',function($scope, $state,  AuthService, $location, state){
    $scope.register = function(){
        AuthService.register($scope.user.email, $scope.user.password, $scope.user.username)
            .then(function(res){
                return AuthService.login($scope.user.email.toLowerCase(), $scope.user.password);
            })
            .then(function(){
                if(state.ui.comeBackUrl){
                    $location.path(state.ui.comeBackUrl);
                }else {
                    state.ui.firstTimeLoggedIn = true;
                    $location.path('/user-profile');
                }
            })
            .catch(function(err){
                var message = err.data.error.message;
                if(message.indexOf('Must provide a valid email') > -1){
                    $scope.registerError = 'Must provide a valid email';
                }
                if(message.indexOf('Email already exists') > -1){
                    $scope.registerError = 'Email already exists';
                }
            });
    };

    $scope.addUserName = function () {
        // return FirepolUser.prototype$updateAttributes(
        //     { id: $scope.$root.authenticatedUser.id }, {username: $scope.update.username}
        // ).$promise
        // .then(function () {
        //     if(state.ui.comeBackUrl){
        //         $location.path(state.ui.comeBackUrl);
        //     } else {
        //         $state.transitionTo('user-profile');
        //     }
        // });
    };
});
'use strict';
/*global angular */
angular.module('app')
    .factory('state', function () {
        return {
            'ui': {}
        };
    });
'use strict';
/*global angular */
angular.module('app').filter('capitalize', function() {
    return function(input, scope) {
        if (input!=null) {
            input = input.toLowerCase();
        }
        return input.substring(0,1).toUpperCase()+input.substring(1);
    };
});
'use strict';
/*global angular */
angular.module('app').directive('checkboxTemplate', function(){
    return {
        restrict:'EA',
        templateUrl: 'js/user-profile/checkbox-template.html',
        link: function(scope, elem, attrs, ctrl){
            scope.field = scope.rowDef;
        }
    };    
});
'use strict';

var Dconsole = {
    error: function (x) {
        console.error(JSON.stringify(x, null, 2));
    },
    log: function (x) {
        console.log(JSON.stringify(x, null, 2));
    }
};


/*global angular, _ */
angular.module('app').controller('profileCtrl', function($scope, $filter, $q, $state, configuration, UserProfile, FirepolUser, state){
    $scope.capitalize = $filter('capitalize');
    $scope.userProfile = {}; //UserProfile.create({userId: '1', sex: 'male'});

    UserProfile.getUserProfileDefinition().$promise
     .then(function(data){

        var currCat, categoryList = [], rowDefList;
        _.forEach(data.userProfileDefinition, function(def) {

            if (currCat !== def.category) {
                currCat = def.category;
                rowDefList = {category: def.category, rowDefList: []};
                categoryList.push(rowDefList);
            }
            rowDefList.rowDefList.push(def);
        });
        $scope.categoryList = categoryList;
         
     },console.log, 
     console.log);

    function findOrCreateProfile(p) {
        if (p.length) {
            $scope.userProfile = p[0];
        } else {
            FirepolUser.UserProfile.create(
                {id: $scope.$root.authenticatedUser.id},
                $scope.userProfile).$promise
                .then(createdProfile);
        }
     }
     function createdProfile(p) {
         $scope.userProfile = p;
     }
     FirepolUser.UserProfile({id: $scope.$root.authenticatedUser.id}).$promise
        .then(findOrCreateProfile);

     $scope.update = function() {
        FirepolUser.UserProfile.updateById({
            id: $scope.$root.authenticatedUser.id, 
            fk: $scope.userProfile.id
        }, $scope.userProfile);
        if (state.ui.firstTimeLoggedIn){
            $state.transitionTo('questions');
        }
     };
});

'use strict';
/*global angular */
angular.module('app').directive('radioTemplate', function(){
    return {
        restrict:'EA',
        templateUrl: 'js/user-profile/radio-template.html',
        link: function(scope, elem, attrs, ctrl){
            scope.field = scope.rowDef;
        }
    };    
});
'use strict';
/*global angular */
angular.module('app').directive('selectTemplate', function(){
    return {
        restrict:'EA',
        templateUrl: 'js/user-profile/select-template.html',
        link: function(scope, elem, attrs, ctrl){
            scope.field = scope.rowDef;
        }
    };    
});