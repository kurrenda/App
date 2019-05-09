module.exports ={

    index:  (req,res) => {
        res.render('admin/index');
    },

    getPosts: (req,res) => {
        res.send("All posts");
    },

    submitPost: (req,res) => {
        res.send("Post Summited");
    },

    createPosts: (req,res) => {
        res.render('admin/posts/create');
    }

};