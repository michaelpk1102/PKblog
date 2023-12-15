// const express = require("express");
// const router = express.Router();
// const multer = require("multer");

// // Define multer storage and upload configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/images"); // Set the destination folder for uploaded images
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname); // Generate a unique filename for each uploaded image
//   },
// });

// const imageLoad = multer({ storage: storage });

// router.use(express.static("public"));

// // Handling Image Upload - POST /loads
// router.post("/loads", imageLoad.single("image"), (req, res) => {
//   if (!req.file) {
//     return res.status(404).send("No Image Uploaded");
//   }

//   res.send("Image Uploaded Successfully");
// });

// module.exports = router;
