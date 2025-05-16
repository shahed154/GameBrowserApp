import React, { useState, useEffect, useContext } from 'react'
import { gameService } from '../../services/api'
import { UserContext } from '../../context/UserContext'
import GameCard from '../ui/GameCard'
import './Home.css'

const Home = () => {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const { currentUser, isAuthenticated } = useContext(UserContext)

  //////////////////// FETCH RECENT POPULAR GAMES ////////////////////
  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true)
        setError("")
        
        console.log("Fetching trending games")
        const gamesData = await gameService.getTrendingGames(1)
        console.log("Games fetched:", gamesData)
        
        setGames(gamesData)
      } catch (error) {
        console.error('Error fetching games:', error)
        setError("Failed to load games")
      } finally {
        setLoading(false)
      }
    }

    fetchGames()
  }, [])

  ///////////// HANDLE PREFERENCES /////////////
  const handleLike = async (gameId) => {
    if (!isAuthenticated) {
      alert('Please create an account to save your preferences')
      return
    }

    try {
      await gameService.saveGamePreference(gameId, true, currentUser._id)
    } catch (error) {
      console.error('Error saving like:', error)
    }
  }

  const handleDislike = async (gameId) => {
    if (!isAuthenticated) {
      alert('Please create an account to save your preferences')
      return
    }

    try {
      await gameService.saveGamePreference(gameId, false, currentUser._id)
    } catch (error) {
      console.error('Error saving dislike:', error)
    }
  }

  return (
    <div className="container">
      <div className="main">
        <h1>Find Your Next Game</h1>
        <p className="main-tagline">
          Popular releases from the last 60 days
        </p>
      </div>

      <h2>Trending Games</h2>
      
      {loading ? (
        <div>
          <div className="spinner"></div>
          <p>Loading games...</p>
        </div>
      ) : error ? (
        <div>
          <p>{error}</p>
        </div>
      ) : (
        <div className="games-grid">
          {games.map(game => (
            <GameCard 
              key={game.id}
              game={game}
              onLike={handleLike}
              onDislike={handleDislike}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home