/* jshint node: true */

var express = require('express');
var app = express();
var http = require('http').Server(app);

app.get('/public/:name', function (req, res, next) {

	var options = {
		root: __dirname + '/public/',
		dotfiles: 'deny',
		headers: {
			'x-timestamp': Date.now(),
			'x-sent': true
		}
	};

	var fileName = req.params.name;

	res.sendFile(fileName, options, function (err) {
		if (err) {
			next(err);
		} else {
			console.log('Sent:', fileName);
		}
	});
});

app.get('/dep/:name', function (req, res, next) {

	var options = {
		root: __dirname + '/dep/',
		dotfiles: 'deny',
		headers: {
			'x-timestamp': Date.now(),
			'x-sent': true
		}
	};

	var fileName = req.params.name;

	res.sendFile(fileName, options, function (err) {
		if (err) {
			next(err);
		} else {
			console.log('Sent:', fileName);
		}
	});
});

app.get('/', function (req, res, next) {

	var options = {
		root: __dirname + '/public/',
		dotfiles: 'deny',
		headers: {
			'x-timestamp': Date.now(),
			'x-sent': true
		}
	};

	var fileName = 'index.html';

	res.sendFile(fileName, options, function (err) {
		if (err) {
			next(err);
		} else {
			console.log('Sent:', fileName);
		}
	});
});

http.listen(3000, function () {
	console.log('listening on *:3000');
});
