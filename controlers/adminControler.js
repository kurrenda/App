const Post = require("../models/PostModel").Post;

module.exports ={

    index:  (req,res) => {
        res.render('admin/index');
    },

    getPosts: (req,res) => {

        var perPage = 9;
        var page = req.params.page || 1


        Post.find().skip((perPage * page) - perPage).limit(perPage).then(posts =>{
            res.render('admin/posts/index', {posts: posts});
        })
    },

    submitPost: (req,res) => {
        const newPost = new Post({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status
        });

        newPost.save().then(post =>{
            console.log(post);
            req.flash('success-message', 'Post created successfully');
            res.redirect('/admin/posts');
        });
    },
    createPosts: (req,res) => {
        res.render('admin/posts/create');
    }


};