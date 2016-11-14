var fs = require('fs');
var uuid = require('uuid');
var s3 = require('s3fs');
var s3Impl = new s3('mogaxi', {
    accessKeyId: 'AKIAJYDJP5UYMI6O2IIQ',
    secretAccessKey: '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'
});

var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();
var Tidbit = require(dirname + '/app/models/swagifiedApi.js').Tidbit;
var Comment = require(dirname + '/app/models/swagifiedApi.js').Comment;


module.exports = function(app, _) {
    app.use(multipartyMiddleware);

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index', {
            config: JSON.stringify({
                user: req.user || false,
                message: req.flash('authMessage')
            })
        });
    });


    app.post('/user-update',function (req, res) {
        var user = req.user;
        var shouldUpdateExistingRecoredsWithNewName = false;
        if(user.username !== req.body.user.username){
            shouldUpdateExistingRecoredsWithNewName = true;
        }
        _.merge(user, req.body.user);
        user.save(function (err, updatedUser) {
            if (err) {
                res.status(500).send('User not updated', err);
            }
            if (shouldUpdateExistingRecoredsWithNewName) {
                Tidbit.find({ownerId: user._id},function(err, tidbits){
                    if(err){return console.log(err);}
                    tidbits.forEach(function(tidbit){
                        tidbit.ownerHandle = updatedUser.username;

                        tidbit.save(function(err){
                            if(err){return console.log(err);}
                        });
                    });
                });

                Comment.find({ownerId: user._id},function(err, comments){
                    if(err){return console.log(err);}
                    comments.forEach(function(comment){
                        comment.ownerHandle = updatedUser.username;

                        comment.save(function(err){
                            if(err){return console.log(err);}
                        });
                    });
                });


            }

            res.send(updatedUser);


        });
    });

    app.post('/avatar-upload',function(req, res){
        var user = req.user;
        var file = req.files.file;
        var stream = fs.createReadStream(file.path);
        var extension = file.path.substring(file.path.lastIndexOf('.'));
        var destPath = '/' + user._id + '/avatar/' +  uuid.v4() + extension;
        var base = 'https://s3-us-west-2.amazonaws.com/mogaxi';

        return s3Impl.writeFile(destPath, stream, {ContentType: file.type}).then(function(one){
            fs.unlink(file.path);
            user.photo = base + destPath;
            user.save(function(err, updatedUser){
                if(err) {
                    res.status(500).send('User not updated', err);
                }

                Tidbit.find({ownerId: user._id},function(err, tidbits){
                    if(err){return console.log(err);}
                    tidbits.forEach(function(tidbit){
                        tidbit.ownerPhotoUrl = updatedUser.photo;

                        tidbit.save(function(err){
                            if(err){return console.log(err);}
                        });
                    });
                });

                Comment.find({ownerId: user._id},function(err, comments){
                    if(err){return console.log(err);}
                    comments.forEach(function(comment){
                        comment.ownerPhotoUrl = updatedUser.photo;

                        comment.save(function(err){
                            if(err){return console.log(err);}
                        });
                    });
                });

                res.send(updatedUser);
            });
        });
    });

};

