var http = require('http');
var fs = require('fs');

// Chargement du fichier index.html affiché au client
var server = http.createServer(function (req, res) {
	fs.readFile('./index.html', 'utf-8', function(eror, content) {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(content);
	});
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connexion', function(socket) {
	console.log('Un client vient de se connecter');
});

server.listen(8080);

/*
 Ce code fait deux choses:
 - Il renvoie le fichier index.html quand un client demande à charger la page dans son navigateur
 - Il se prépare à reçevoir des requêtes via socket.io. Ici on s'attends à reçevoir un seul type de message : la connexion.
  Lorsqu'on se connecte vie socket.io, on loggue ici l'information dans la console.
*/