const express = require ("express")
const router = express.Router()
const Post = require ("../models/post")
const newPostController = require ("../controller/controller.post")

//-------------------- Get all post from DB-------------------------------
// router.get = ("/", (req, res) => {
// // ----------------- Get all posts From DB
// Post.find({}, (err, allPost)  => {
//     if(err) {
//         console.log("Error in Find")
//         console.log(err);
//     } else {
//         res.render("post/index", {
//             post: allPost.reverse(),
//             currentUser: req.user,
//         })
//     }
// })
// })

// ------------------- HANDING NEW POST -----------------------------------------
router.get("/post", newPostController.displayForm)

router.post("/post", newPostController.createPost)


module.exports = router