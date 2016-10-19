var fs = require('fs');
var uuid = require('uuid');
var s3 = require('s3fs');
var s3Impl = new s3('mogaxi', {
    accessKeyId: 'AKIAJYDJP5UYMI6O2IIQ',
    secretAccessKey: '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'
});

var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();

module.exports = function(app, _) {
    app.use(multipartyMiddleware);

    app.post('/user-update',function (req, res) {
        var user = req.user;
        
        _.merge(user, req.body.user);
        user.save(function (err, updatedUser) {
            if (err) {
                res.status(500).send('User not updated', err);
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
                res.send(updatedUser);
            });
        });
    });

};

