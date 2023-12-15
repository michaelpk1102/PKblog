const User = require("../models/user");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
require("dotenv").config()


const register = (req, res) => {
  return res.status(200).render("auth/register");
};

const createRegister = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .send("Email already exists. Please use a different email");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const verificationToken = Math.random().toString(36).substring(7);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
    });

    const transporter = nodemailer.createTransport ({
      service: "gmail",
      auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
      }
    
    });
    

    const sentVerificationEmail = {
      from: "emmanuelmichaelpk3@gmail.com",
      to: email,
      subject: "Account Verification",
      text: `Please click this link to verify your account: http://localhost:3000/verify/${verificationToken}`,
    };

    transporter.sendMail(sentVerificationEmail, async (error, info) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({ message: "Failed to send verification email" });
      }

      console.log("Email sent: " + info.response);

      try {
        await user.save();
        return res.status(200).render("auth/login");
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).send("Error creating user");
      }
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Error registering user");
  }
};

const verifyEndpoint = async (req, res) => {
  const token = req.params.token;

  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(404).json({ message: "Invalid or expired token" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    return res.status(200).json({ message: "Account verified successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Failed to verify account" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("Email not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send("Invalid password");
    }

    return res.status(200).render("post/new");
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Error logging in");
  }
};

module.exports = {
  register,
  createRegister,
  login
};
