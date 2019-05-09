const express = require('express');
const router = express.Router();
const defaultControler = require('../controlers/defaultControler');


router.all('/*', (req,res,next) =>{

    req.app.locals.layout = 'default';

    next();
});

router.route('/')
    .get(defaultControler.index);

router.route('/login')
    .get(defaultControler.loginGet)
    .post(defaultControler.loginPost);

router.route('/sensors')
    .get(defaultControler.sensor);

router.route('/register')
    .get(defaultControler.registerGet)
    .post(defaultControler.registerPost);


module.exports = router;