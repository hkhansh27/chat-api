const http = require('http');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const socketio = require('socket.io');
require('./config/mongo');

const WebSockets = require('./utils/WebSockets');

const auth = require('./middlewares/auth');

const indexRouter = require('./router/index');
const userRouter = require('./router/user');
const chatRoomRouter = require('./router/chatRoom');
const deleteRouter = require('./router/delete');

const app = express();

/** Get port from environment and store in Express. */
const port = process.env.PORT || '8080';
app.set('port', port);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', userRouter);
//user must login to create a chat message
app.use('/room', auth.decode, chatRoomRouter);
app.use('/delete', deleteRouter);

app.use((error, req, res, next) => {
  console.log('💥💥💥💥💥💥💥');
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.use('*', (req, res) => {
  res
    .status(404)
    .json({ success: false, message: 'API endpoint does not exist' });
});

const server = http.createServer(app);

/** Create socket connection */
global.io = socketio.listen(server);
global.io.on('connection', client => {
  WebSockets.connection(client);
  console.log('Connecteddddddd');
});

server.listen(port);
/** Event listener for HTTP server "listening" event. */
server.on('listening', () => {
  console.log(`Listening on port:: http://localhost:${port}/`);
});
