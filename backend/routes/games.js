import express from "express"
// * is faster than just writing out all the exports
import * as gameApiService from '../services/rawgApi.js';
import User from '../models/User.js';

const router = express.Router()

///  GET RECOMMENDATIONS

router.get(`/recommendations`, async (req, res) => 
{
  try 
  {
    const page = req.query.page || 1
    const games = await gameApiService.getGames(page)
    res.json(games);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

/// GET GAME DETAILSS 
router.get('/:id', async (req, res) => {
  try 
  {
    const game = await gameApiService.getGameDetails(req.params.id);
    res.json(game)
  } catch (err) {
    console.error(err.message)
      res.status(500).send(`Server error`);
  }
})

///// GET LIKED GAMES
router.get("/user/:userId/liked", async (req, res) => {
  try 
  {

    const user = await User.findById(req.params.userId)
    

    if (!user)
       {
      return res.status(404).json({ message: 'USER NOT FOUND' })
    }

    const likedGamesDetails = await Promise.all
    (
      user.likedGames.map(gameId => gameApiService.getGameDetails(gameId))
    )
    
    res.json(likedGamesDetails);
  } catch (err) {
    console.error(err.message)
    res.status(500).send("SERVER ERROR")
  }
})



// change liked to dislike if need to make a disliked section,. IN FUTURE  ***

// router.get("/user/:userId/liked", async (req, res) => {
//   try 
//   {
//     const user = await User.findById(req.params.userId);
    
//     if (!user) 
//       {
//       return res.status(404).json({ message: 'USER NOT FOUND' });
//     }

//     const likedGamesDetails = await Promise.all
//     (
//       // get game details from the liked games array 
//       user.likedGames.map(gameId => 
//         gameApiService.getGameDetails(gameId))
//     )
    
//     res.json(likedGamesDetails)
//   } catch (err) {
//     console.error(err.message);
//        res.status(500).send("SERVER ERROR");

//   }
// });

export default router