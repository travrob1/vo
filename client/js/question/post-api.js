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
        return $http.post('/posts',{
            'title': questionObj.title
            })
        .then(sendTidbit);

        function sendTidbit(res) {
            var theRes = res;
            return $http.post('/posts/'+res.data._id+'/tidbits',{
                'content': questionObj.details,
                'ownerHandle': questionObj.username,
                'ownerPhotoUrl': questionObj.photo
            }).then(function(tbRes) {
                return tbRes;
            });
        }
    }

    function findTidbitsByPostId(id){
        return $http.get('/posts/'+id + '/tidbits');
    }

    function postTidbitsByPostId(postId, content, user){
        return $http.post('/posts/'+postId+'/tidbits',{
            'content': content,
            'ownerHandle': user.username,
            'ownerPhotoUrl': user.photo
        });
    }

    function getComments(tidbitId){
        return $http.get('/tidbits/' +tidbitId+ '/comments');
    }

    function postComment(tidbitId, data){
        return $http.post('/tidbits/' +tidbitId+ '/comments', data);
    }

    function getPosts(){
        return $http.get('/posts');
    } 
    function getPostById(id){
        return $http.get('/posts/'+ id);
    }
}