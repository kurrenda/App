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
    .get(adminControler.getPosts)
    .post(adminControler.submitPost);

router.route('/posts/create')
    .get(adminControler.createPosts);

module.exports = router;