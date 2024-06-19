const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const cors = require('cors');
const config = require('./config');

const userRouter = require('./routes/userRouter');
const collectionRouter = require('./routes/collectionRouter');
const questionRouter = require('./routes/questionRouter');
const questionConnectRouter = require('./routes/collectionConnectRouter');
const examRouter = require('./routes/examRouter');
//Chưa check
const enrollmentRouter = require('./routes/enrollmentRouter');


const app = express();
app.use(bodyParser.json());

const port = 3000;
const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log('MongoDB successfully connected');
}).catch((err) => {
    console.log('MongoDB connect to failed', err);
});

app.use(
    session({
        name: "session-id",
        secret: "12345-67890-09876-54321",
        saveUninitialized: false,
        resave: false,
        store: new FileStore(),
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Enable CORS for all routes
app.use(cors());

// Routes
app.use('/users', userRouter);
app.use('/collections', collectionRouter);
app.use('/question', questionRouter);
app.use('/questionConnect', questionConnectRouter);
app.use('/exam', examRouter);
// Chưa check
app.use('/enrollment', enrollmentRouter);

app.listen(port, () => {
    console.log(`Server is running with port ${port}`);
});
