const Post = require ("../models/post")

// ------------------- Creating a new post -------------------------------------

const displayForm = (req, res) => {
    return res.status(200).render("post/new")
}


const createPost = async (req, res) => {
    const name = req.body.name;
    const imageUrl = req.body.image;
    const description = req.body.description;
    const author = {
        // id: req.user._id,
        // email: req.user.email
    };

    try {
    // -------------- Create a new Post object---------------------------------------
        const post = new Post({ 
            name: name,
            imageUrl: imageUrl,
            description: description,
            author: author
        });

    // ---------------- Save the new post to the database-----------------------------
        await post.save();

        return res.status(201).send(post);
    } catch (error) {
        res.render("post/new")
    }  
};

// ---------------------- Show form to create new post-------------------------------



module.exports = {
    displayForm,
    createPost

}