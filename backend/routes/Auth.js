const express = require('express');
const router = express.Router();
const User = require("../models/Auth");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/fetchUser');
const JWT_SECRET = "AbdulRehman$King";

// Route 1: Signup user using POST "/api/auth/signup" : No login require
router.post('/signup', [
   body('name', 'Name must be atleast three characters').isLength({ min: 3 }),
   body('email', 'Enter valid email address').isEmail(),
   body('password', 'Password should be atleast six characters').isLength({ min: 6 }),
   body('gender', 'Enter valid gender i.e(male,female,other)').isLength({ min: 4 })
], async (req, res) => {
   // Return bad request if there are errors
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   try {
      // Checing is the email already exist or not
      let user = await User.findOne({ email: req.body.email });
      if (user) {
         return res.status(400).json({ error: "User already exist with this email address" });
      }
      // Creating a user
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(req.body.password, salt);
      user = await User.create({
         name: req.body.name,
         email: req.body.email,
         password: hashPassword,
         gender: req.body.gender
      })
      // Sending token in response
      const data = {
         user:{
            id: user.id
         }
      }
      const authToken = jwt.sign(data, JWT_SECRET);
      res.send({authToken});
   } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Internal server error" });
   }
});
// Route 2: Login user using POST "/api/auth/login" : No login require
router.post('/login', [
   body('email', 'Enter valid email').isEmail(),
   body('password', 'Password must be atleast 6 char').isLength({ min: 6 }),
], async (req, res) => {
   // Return bad request if there are errors
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   try {
      const {email, password} = req.body;
      // Checing is the user with this email exist or not
      let user = await User.findOne({ email });
      if (!user) {
         return res.status(400).json({ error: "Try to login using correct credentials" });
      }
      // Comparing Password
      let comparePassword = bcrypt.compareSync(password, user.password);
      if(!comparePassword){
         return res.status(400).json({ error: "Try to login using correct credentials" });
      }
      // Sending authentication token in response
      const data = {
         user:{
            id: user.id
         }
      }
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
   } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Internal server error" });
   }
});

// Route 3: Getting user detail using POST "/api/auth/getuser" : Login require
router.post('/getuser', fetchUser, async (req,res) => {
   try {
      const userId = req.user.id;
      let user = await User.findById(userId).select("-password");
      res.send(user);
   } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Internal server error" });
   }
})

module.exports = router;