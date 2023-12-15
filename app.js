const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require ("body-parser")
// --------- DATABASE SETUP ----------------
const mongo_Uri =  'mongodb://localhost:27017/pkUser';

mongoose.connect(mongo_Uri,{

});




const db = mongoose.connection

db.on('error', (err) => {
  console.error('Error occur while connecting', err);
});

db.once('open', () => {
  console.log('Database Connected Successfully');
});





// ----------------- GENRAL CONFIGURATION ----------------
app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine", "ejs")
// app.use(express.static(__dirname + "/public"))


// --------------------ROUTER------------------------------
const routerUser = require ("./routes/user")
const routerPost = require("./routes/post")
// const imageRouter = require("./public/image")



app.use(routerUser)
app.use(routerPost)


//-----------------LISTENING ON PORT -------------------------

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server Listening at http://localhost:${port}`);
});
