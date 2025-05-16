//// FINISH LATER **************

// import express from "express"
// import bcrypt from 'bcryptjs'
// import jwt from "jsonwebtoken";
// import User from '../models/User.js'

// const router = express.Router();


// /////// REGISTER POST


// router.post("/register", async (req, res) => 
// {
//   try {
//     const { username, email, password } = req.body
    
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ message: `User already existss` });
//     }
    
//     user = new User({
//       username,
//       email,
//       password
//     });
    
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);
    
//     await user.save();
    
//     const payload = {
//       user: {
//         id: user.id
//       }
//     }
    
//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token })
//       }
//     )
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send(`Server error`)
//   }
// });


// export default router