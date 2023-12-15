const express = require ("express")
const Router = express.Router()

const {register,createRegister, login} = require ("../controller/controller.user")



// ------------HANDLE A SIGNUP LOGIN----------------------
Router.get("/register", register)
Router.post("/register", createRegister)

// ---------- HANDLE A LOGIN------------------------------
Router.get("/login", login)
Router.post("/login", login)











module.exports = Router