const express = require('express');
const router = express.Router();
const defaultControler = require('../controlers/defaultControler');

router.route('/')
    .get(defaultControler.index);


module.exports = router;