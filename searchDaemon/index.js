var MongoClient = require('mongodb').MongoClient,
  test = require('assert'),
  _ = require('lodash'),
  objectId = require('mongodb').ObjectID;

// Connection url
var url = 'mongodb://vo@localhost/vo';

MongoClient.connect(url, function(err, db) {
    var cancelWork;
    function scheduleWork() {
        checkForUnindexedData(db);
        cancelWork = setTimeout(_.partial(scheduleWork), 2000);
    }
    if (err) {
        console.log(err);
    } else {
        scheduleWork();
    }
});

function checkForUnindexedData(db) {
    // Create a collection we want to drop later
    var posts = db.collection('posts');
    var postResult = posts.find({indexed: {$ne: true}});
    postResult.toArray(function(err, items) {
        _.forEach(items, function(item) {
            console.log(item);
            var updateCompletePromise = posts.update({_id: objectId(item._id)}, {$set: {indexed: true}});
            // TODO: Post to elastic
        });
    });

    var tidbits = db.collection('tidbits');
    var tidbitResult = tidbits.find({indexed: {$ne: true}});
    tidbitResult.toArray(function(err, items) {
        _.forEach(items, function(item) {
            console.log(item);
            var updateCompletePromise = tidbits.update({_id: objectId(item._id)}, {$set: {indexed: true}});
            // TODO: Post to elastic
        });
    });

    var comments = db.collection('comments');
    var commentResult = comments.find({indexed: {$ne: true}});
    commentResult.toArray(function(err, items) {
        _.forEach(items, function(item) {
            console.log(item);
            var updateCompletePromise = comments.update({_id: objectId(item._id)}, {$set: {indexed: true}});
            // TODO: Post to elastic
        });
    });
}

