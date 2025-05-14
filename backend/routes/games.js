
import express from "express"
import * as gameApiService from '../services/rawgApi.js';
import User from '../models/User.js';

const router = express.Router();

///   GET RECOMENDATIONS

router.get(`/recommendations`, async (req, res) => 
{
  try 
  {
    const games = await gameApiService.getGames(req.query)
    res.json(games);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/// GET GAME DETAIILS 
router.get('/:id', async (req, res) => {
  try 
  {
    const game = await gameApiService.getGameDetails(req.params.id);
    res.json(game)
  } catch (err) {
    console.error(err.message);
    res.status(500).send(`Server error`);
  }
});

//// PREFERENCES  POST
router.post(`/preference`, async (req, res) => {
  try 
  {
    const { gameId, liked, userId } = req.body;
    
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'USER NOT FOUND' })
    }
    
    if (liked) {
      if (!user.likedGames.includes(gameId)) {
        user.likedGames.push(gameId);
      }
  
      user.dislikedGames = user.dislikedGames.filter(id => id !== gameId);
    } else {
      if (!user.dislikedGames.includes(gameId)) {
        user.dislikedGames.push(gameId);
      }

      user.likedGames = user.likedGames.filter(id => id !== gameId)
    }
    
    await user.save();
    
    res.json({ message: `Preferencee saved` })
  } catch (err) {
    console.error(err.message);
    res.status(500).send("SERVER ERROR");
  }
});

///// GET LIKED GAMES
router.get("/user/:userId/liked", async (req, res) => {
  try 
  {
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'USER NOT FOUND' });
    }

    const likedGamesDetails = await Promise.all(
      user.likedGames.map(gameId => gameApiService.getGameDetails(gameId))
    )
    
    res.json(likedGamesDetails)
  } catch (err) {
    console.error(err.message);
       res.status(500).send("SERVER ERROR");

  }
});

export default router