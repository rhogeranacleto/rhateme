const express = require('express');
const app = express();
const path = require('path');

const file = /.+\.(css|js)/g;

// Serve only the static files form the dist directory
app.get('/*', function(req, res) {

	if (/.+\.(css|js)/.exec(req.params[0])) {

		res.sendFile(path.join(__dirname + '/dist/' + req.params[0]));
	} else {

		res.sendFile(path.join(__dirname + '/dist/index.html'));
	}
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);