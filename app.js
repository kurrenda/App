const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const hbs = require('express-handlebars')
const {mongoDbUrl, PORT} = require('./config/configuration')

const app = express();


app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
})

//mongose
mongoose.connect(mongoDbUrl, {useNewUrlParser: true})
    .then(response =>{
      console.log("Mongodb connected succsessfully")
    }).catch(err =>{
      console.log("Db connection failed")
})



// view engine setup

app.engine('handlebars', hbs({defaultLayout: 'default'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes

const defaultRoutes = require('./routes/defaultRoutes');
const adminRoutes = require('./routes/adminRoutes');
app.use('/', defaultRoutes);
app.use('/admin', adminRoutes);


module.exports = app;
