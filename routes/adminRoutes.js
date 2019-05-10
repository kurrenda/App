const express = require('express');
const router = express.Router();
const adminControler = require('../controlers/adminControler');

router.all('/*', (req,res,next) =>{

    req.app.locals.layout = 'admin';

    next();
});


router.route('/')
    .get(adminControler.index);

router.route('/posts')
    .get(adminControler.getPosts);

router.route('/posts/create')
    .get(adminControler.createPosts)
    .post(adminControler.submitPost);

module.exports = router;