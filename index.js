const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const HTTPSTATUSCODE = require('./src/utils/httpStatusCode');
const { setError } = require('./src/utils/errors/errors');
const { configCloudinary } = require('./src/utils/cloudinary/config');
const { connect } = require('./src/utils/db/db');
const users = require('./src/api/users/user.routes');
const companies = require('./src/api/companies/company.routes');
const offers = require('./src/api/offers/offer.routes');
const chats = require('./src/api/chats/chat.routes');
const http = require('http');
const { Server } = require('socket.io');

//PORT
const PORT = process.env.PORT || 8080;

//INITIALIZE APP
connect();
const app = express();
configCloudinary();

//HEADERS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

//PROXIES
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://localhost:4200',
      'https://localhost:5500',
      'http://127.0.0.1:5500',
      'https://upgrade-jobs-app.vercel.app',
    ],
    credentials: true,
  })
);

//MORGAN
app.use(logger('dev'));

//DATA LIMIT
app.use(express.json({ limit: '5mb' }));

//URI
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

//ROUTES
app.use('/users', users);
app.use('/companies', companies);
app.use('/offers', offers);
app.use('/chats', chats);

//ROUTES ERROR
app.use((req, res, next) => {
  let err = new Error();
  err.status = 404;
  err.message = HTTPSTATUSCODE[404];
  next(err);
});

//ERROR HANDLING
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json(err.message || 'Unexpected error');
});

//API !SHOW
app.disable('x-powered-by');
//LISTEN
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}, http://localhost:${PORT}`);
});

const serverM = http.createServer(app);

const io = new Server(serverM, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive', data);
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

serverM.listen(3001, () => {
  console.log('SERVER RUNNING');
});
