import express from "express"
import User from '../models/User.js';

const router = express.Router();

router.get("/:id", async (req, res) => 
{
  try 
  {
    const user = await User.findById(req.params.id).select('-password')
    
    if (!user) {
      return res.status(404).json({ message: `User NOT found` });
    }
    
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error")
  }
});

//// PREFERENCE POST
router.post('/preference', async (req, res) => {
  try 
  {
    const { gameId, liked, userId } = req.body
    const gameIdNum = Number(gameId);
    
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User NOT found" })
    }
    
    if (liked) {
      if (!user.likedGames.includes(gameIdNum)) {
        user.likedGames.push(gameIdNum);
      }

      user.dislikedGames = user.dislikedGames.filter(id => id !== gameIdNum);
    } else {
      if (!user.dislikedGames.includes(gameIdNum)) {
        user.dislikedGames.push(gameIdNum)
      }

      user.likedGames = user.likedGames.filter(id => id !== gameIdNum);
    }
    
    await user.save();
    
    res.json({ message: `Preference saved` })
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
 
export default router