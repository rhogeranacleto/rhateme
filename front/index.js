const express = require('express');
const app = express();
const path = require('path');

// Serve only the static files form the dist directory
app.get('/*', function(req, res) {

	if (/.+\.(css|js|webmanifest|json|ico|png|xml|zip|svg)$/.exec(req.params[0])) {

		res.sendFile(path.join(__dirname + '/dist/' + req.params[0]));
	} else {

		console.log(req.params[0]);
		res.sendFile(path.join(__dirname + '/dist/index.html'));
	}
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);