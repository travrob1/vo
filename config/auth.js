// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID' 		: '365784007109876', // your App ID
		'clientSecret' 	: 'a488fcf5bbeefb4983659728ac1f76a7', // your App Secret
		'callbackURL' 	: '/auth/facebook/callback',
    	'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,gender,last_name,link,locale,name,timezone,verified,email,updated_time,picture.type(large)'

	},

	'twitterAuth' : {
		'consumerKey' 		: 'your-consumer-key-here',
		'consumerSecret' 	: 'your-client-secret-here',
		'callbackURL' 		: '/auth/twitter/callback'
	},

	'googleAuth' : {
		'clientID' 		: '1067698620369-vfov9nirm80s2v8lqqe6ftvkfnbak3vc.apps.googleusercontent.com',
		'clientSecret' 	: 'y1Y3Bw5wZTvJq_Sbd0p65Pbs',
		'callbackURL' 	: '/auth/google/callback'
	}

};