
module.exports = function(app, _) {

    
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
        console.log('saweet', req.body);
        res.send({sweetness: true});
    });

};

