var express = require('express');
var Path = require('path');
var http = require('http');
var app = express();
var server = http.createServer(app);

var routes = express.Router();

var port = 3000;
var assetFolder = Path.resolve(__dirname + '/../dist');
var bodyParser = require('body-parser');



var socket = require('./socket.js');
var io = require('socket.io').listen(server);
io.sockets.on('connection', socket);



routes.use(express.static(assetFolder));
app.use('/', routes)

app.use( bodyParser.json() )
app.use(bodyParser.urlencoded({ extended: true }));

var textRouter = require('./apis/text-api');
var userRouter = require('./apis/user-api');

routes.use( bodyParser.json() )
routes.use('/text', textRouter);
routes.use('/user', userRouter);

routes.get('/*', function(req, res){
  res.sendFile(assetFolder + '/index.html');
})

server.listen(port);
console.log('Listening on port', port);












// if(process.env.NODE_ENV !== 'test'){  
//   // Catch-all Route
//   // This is for supporting browser history pushstate.

//   routes.get('/gameview.jsx', function(request, response){
//     response.sendFile( assetFolder + '/app/gameview/gameview.jsx')
//   });


//   // NOTE: Make sure this route is always LAST.
//   routes.get('/*', function(request, response){
//     response.sendFile( assetFolder + '/index.html');
//   });

//   // We're in development or production mode;
//   // Create and run a real server.

//   // Mount our main router
//   app.use('/', routes);

//   //Start the server!
//   var port = process.env.PORT || 4000;
//   app.listen(port);
//   console.log("Listening on port", port);
// }
// else {
//   // We're in test mode; make this file importable instea.
//   module.exports = routes;
// }