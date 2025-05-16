import axios from 'axios'

const BASE_URL = 'http://localhost:5000'

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
///////////////////////////////////////////////////////
//////////////// GAME API SERVICES //////////////////
////////////////////////////////////////////////////
export const gameService = {
  getTrendingGames: async (page = 1) => {
    try {
      console.log(`Fetching trending games, page ${page}`)
      const response = await api.get(`/api/games/recommendations?page=${page}`)
      console.log(`API response for trending games: ${response.status}, games: ${response.data.length}`)
      
 
      const gamesWithFullData = await Promise.all(
        response.data.map(async (game) => {
          if (game.screenshots && game.screenshots.length > 0) {
            return game
          }
          
          try {
            return await gameService.getGameDetails(game.id)
          } catch (err) {
            console.error(`Failed to load full details for game ${game.id}`)
            return game
          }
        })
      )
      
      return gamesWithFullData
    } catch (error) {
      console.error('Error fetching trending games:', error)
      throw error
    }
  },

  getGameDetails: async (gameId) => {
    try {
      console.log(`Fetching game details for ID: ${gameId}`)
      const response = await api.get(`/api/games/${gameId}`)
      console.log(`Details fetched. Has screenshots: ${response.data.screenshots ? 'Yes' : 'No'}`)
      
      return response.data
    } catch (error) {
      console.error(`Error fetching game details for ID ${gameId}:`, error)
      throw error
    }
  },

  saveGamePreference: async (gameId, liked, userId) => {
    try {
      console.log(`Saving preference: Game ${gameId}, Liked: ${liked}, User: ${userId}`)
      const response = await api.post('/api/users/preference', {
        gameId,
        liked,
        userId
      })
      return response.data
    } catch (error) {
      console.error('Error saving game preference:', error)
      throw error
    }
  },

  getUserLikedGames: async (userId) => {
    try {
      console.log(`Fetching liked games for user ${userId}`)
      const response = await api.get(`/api/games/user/${userId}/liked`)
      console.log(`Liked games fetched: ${response.data.length}`)
      
      const gamesWithFullData = await Promise.all(
        response.data.map(async (game) => {
          if (game.screenshots && game.screenshots.length > 0) {
            return game
          }
          
          try {
            return await gameService.getGameDetails(game.id)
          } catch (err) 
          {
          
            console.error(`Failed to load full details for game ${game.id}`)
            return game
          }
        })
      )
      
      return gamesWithFullData
    } catch (error) {
      console.error('Error fetching liked games:', error)
      throw error
    }
  },

  loginOrCreateUser: async (username) => {
    try {
      console.log(`Login/create for user: ${username}`)
      const response = await api.post('/api/users/login-or-create', { username })
      return response.data
    } catch (error) {
      console.error('Error logging in or creating user:', error)
      throw error
    }
  },
  
  removeLikedGame: async (gameId, userId) => {
    try {
      console.log(`Removing game ${gameId} from user ${userId}'s liked games`)
      const response = await api.delete(`/api/users/liked-game/${userId}/${gameId}`)
      return response.data
    } catch (error) {
      console.error('Error removing liked game:', error)
      throw error
    }
  }
}