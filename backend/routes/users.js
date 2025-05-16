import express from "express"
import User from '../models/User.js'

const router = express.Router()


router.get("/:id", async (req, res) => 
{
  try 
  {
    const user = await User.findById(req.params.id).select('-password')
    
    if (!user) {
      return res.status(404).json({ message: `USER NOT FOUNd` })
    }
    
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
})

//// PREFERENCE POST
router.post('/preference', async (req, res) => {
  try 
  {
    const { gameId, liked, userId } = req.body
    const gameIdNum = Number(gameId)
    
    const user = await User.findById(userId)
    
    if (!user) {
     return res.status(404).json({ message: `USER NOT FOUND` })

    }
    
    if (liked) {
      if (!user.likedGames.includes(gameIdNum)) {
        user.likedGames.push(gameIdNum)
      }

      user.dislikedGames = user.dislikedGames.filter(id => id !== gameIdNum)
    } else {
      if (!user.dislikedGames.includes(gameIdNum)) {
        user.dislikedGames.push(gameIdNum)
      }

      user.likedGames = user.likedGames.filter(id => id !== gameIdNum)
    }
    
    await user.save()
    
    res.json({ message: `Preference saved` })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

//// DELETE LIKED GAME
router.delete('/liked-game/:userId/:gameId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const gameId = Number(req.params.gameId);
    
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "USER NOT FOUND" });
    }
    
    // Remove the game from liked games array
    user.likedGames = user.likedGames.filter(id => id !== gameId);
    
    await user.save();
    
    res.json({ 
      message: "Game removed from liked games", 
      likedGames: user.likedGames 
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// LOGIN OR CREATE USER
router.post('/login-or-create', async (req, res) => 
  {
  try {

const username = req.body.username;
    
    if (!username) 
      {
      return res.status(400).json({ message: "Username is required" })
    }
    
   // find if a suer is in our mongodb 
    let user = await User.findOne({ username })
    let isNew = false
    
    if (user) {
      
      console.log(`User ${username} logged in`)
    } else
     {
      user = new User({
        
        username,

        // might need integration later 
        // email: `${username}@example.com`, 
        // password: "sample", 


        likedGames: [],
        dislikedGames: []
      })
      
      await user.save()

      isNew = true

      console.log(`New user ${username} created`)
    }
    
    res.json({ 
      message: isNew ? "User created successfully" : "User logged in successfully", 
      user,

      isNew
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})
 

// was going to use JWT for authentication but gave up 
// TO DO : FINISH JWT FOR LOG IN AND REGISTERINGH

// router.post("/register", async (req, res) => 
// {
//   try {
//     const { username, email, password } = req.body
    
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ message: `User already exists` });
//     }
    
//     user = new User({
//       username,
//       email,
//       password
// //     });

//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//  router.post("/login", async (req, res)

export default router