const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const hbs = require('express-handlebars');
const {mongoDbUrl, PORT} = require('./config/configuration');
const flash = require('connect-flash');
const session = require('express-session');
const {globalVariables} = require('./config/configuration');

const app = express();


var server = app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

//mongose
mongoose.connect(mongoDbUrl, {useNewUrlParser: true})
    .then(response =>{
      console.log("Mongodb connected succsessfully")
    }).catch(err =>{
      console.log("Db connection failed")
});

app.use(flash());

// view engine setup

app.engine('handlebars', hbs({defaultLayout: 'default'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// flash and session

app.use(session({
    secret: 'anysecret',
    saveUninitialized: true,
    resave: true
}));

app.use(globalVariables);




// routes

const defaultRoutes = require('./routes/defaultRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/', defaultRoutes);
app.use('/admin', adminRoutes);

var io = require('socket.io')(server);
const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort('COM4'); //Connect serial port to port COM3. Because my Arduino Board is connected on port COM3. See yours on Arduino IDE -> Tools -> Port
const parser = port.pipe(new Readline({delimiter: ',\r\n'})); //Read the line only when new line comes.


io.on('connection', (socket) => {
    console.log("Someone connected.");
    parser.on('data', (temp) => { //Read data
        console.log(temp);
        var today = new Date();
        io.sockets.emit('temp', {date: today.getDate()+"-"+today.getMonth()+"-"+today.getFullYear(), time: (today.getHours())+":"+(today.getMinutes()+":"+ today.getMilliseconds()), temp: temp.split(",")}); //emit the datd i.e. {date, time, temp} to all the connected clients.
    });
});



module.exports = app;
