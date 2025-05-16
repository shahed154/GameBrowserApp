import React, { useState, useEffect } from 'react'
import { gameService } from '../../services/api'
import './GameCard.css'

const GameCard = ({ game, onLike, onDislike, showActions = true }) => {
  const [expanded, setExpanded] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [gameDetails, setGameDetails] = useState(null)
  const [images, setImages] = useState([])
  
  ///////// IMAGES FOR CAROUSEL /////////
 
  useEffect(() => {
    if (!game) return
    
    let imageArray = []
    
   
    if (game.background_image) {
      imageArray.push({
        src: game.background_image,
        alt: game.name
      })
    }
 
    if (game.screenshots && game.screenshots.length > 0) {
      game.screenshots.forEach(screenshot => {
        if (screenshot.image) {
          imageArray.push({
            src: screenshot.image,
            alt: `${game.name} screenshot`
          })
        }
      })
    }
    
    setImages(imageArray)
  }, [game])

  if (!game) return null

  ////////// DESCRIPTION HANDLING //////////
  const getDisplayDescription = () => {

    if (loading) {
      return "Loading..."
    }
    
   
    if (expanded && gameDetails && gameDetails.description) {
      const cleanText = gameDetails.description.replace(/<\/?[^>]+(>|$)/g, '')
      return cleanText
    }
    
   
    let shortDesc = game.description || ""
    
    // Clean HTML tags
    shortDesc = shortDesc.replace(/<\/?[^>]+(>|$)/g, '')
 
    if (!expanded && shortDesc.length > 150) {
      return shortDesc.substring(0, 150) + "..."
    }
    
    return shortDesc
  }

  /////// IMAGE NAVIGATION ///////
  const handlePrevImage = () => {
    if (images.length <= 1) return
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    if (images.length <= 1) return
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  /////// HANDLE SHOW MORE ///////
  const handleShowMore = async () => {
    
    if (expanded) {
      setExpanded(false)
      return
    }
    

    if (gameDetails) {
      setExpanded(true)
      return
    }
    

    try {
      setLoading(true)
      const details = await gameService.getGameDetails(game.id)
      setGameDetails(details)
      
     
      if (details.screenshots && details.screenshots.length > 0) {
        let updatedImages = [...images]
        
        details.screenshots.forEach(screenshot => {
          if (screenshot.image) {
         
            const exists = updatedImages.some(img => img.src === screenshot.image)
            if (!exists) {
              updatedImages.push({
                src: screenshot.image,
                alt: `${game.name} screenshot`
              })
            }
          }
        })
        
        setImages(updatedImages)
      }
      
      setExpanded(true)
    } catch (error) {
      console.error("Failed to load game details:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="game-card">
      <div className="game-card-media">
        {images.length > 0 ? (
          <>
            <img 
              src={images[currentImageIndex].src} 
              alt={images[currentImageIndex].alt || game.name} 
              className="game-card-image" 
            />
            
            {images.length > 1 && (
              <>
                <div className="image-nav">
                  <button 
                    className="image-nav-button"
                    onClick={handlePrevImage}
                  >
                    ‹
                  </button>
                  <button 
                    className="image-nav-button"
                    onClick={handleNextImage}
                  >
                    ›
                  </button>
                </div>
                <div className="image-counter">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="game-card-placeholder">
            <span>No Image</span>
          </div>
        )}
      </div>
      
      <div className="game-card-content">
        <h3 className="game-card-title">{game.name}</h3>
        
        {game.metacritic && (
          <div className="game-card-meta">
            <span>Score: {game.metacritic}</span>
          </div>
        )}
        
        {game.genres && game.genres.length > 0 && (
          <div className="game-card-genres">
            {game.genres.map(genre => (
              <span key={genre.id} className="genre-tag">
                {genre.name}
              </span>
            ))}
          </div>
        )}
        
        <p className="game-card-description">
          {getDisplayDescription()}
        </p>
        
        <div className="game-card-actions">
          <button 
            className="btn btn-secondary"
            onClick={handleShowMore}
          >
            {loading ? "Loading..." : expanded ? "Show Less" : "Show More"}
          </button>
          
          {showActions && onLike && onDislike && (
            <div className="like-dislike-buttons">
              <button 
                className="like-button"
                onClick={() => onLike(game.id)}
              >
                👍
              </button>
              
              <button 
                className="dislike-button"
                onClick={() => onDislike(game.id)}
              >
                👎
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GameCard