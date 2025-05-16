import React, { useState } from 'react'
import './GameCarousel.css'

const GameCarousel = ({ items = [] }) => {
  let normalizedItems = items
  
  if (!normalizedItems || normalizedItems.length === 0) {
    console.log("No carousel items provided")
    return null
  }
  

  normalizedItems = normalizedItems.filter(item => {
 
    return item && item.src
  })
  
  const [currentIndex, setCurrentIndex] = useState(0)

  if (normalizedItems.length === 1) {
    const item = normalizedItems[0]
    return (
      <div className="carousel-container">
        <div className="carousel-item">
          <img src={item.src} alt={item.alt || ''} className="carousel-image" />
        </div>
      </div>
    )
  }

  /////// CAROUSEL NAVIGATION ///////
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? normalizedItems.length - 1 : prevIndex - 1
    )
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % normalizedItems.length)
  }


  const currentItem = normalizedItems[currentIndex]
  
  if (!currentItem) {
    return null
  }
  
  return (
    <div className="carousel-container">
   
      <div className="carousel-inner">
        <div className="carousel-item">
          <img 
            src={currentItem.src} 
            alt={currentItem.alt || ''} 
            className="carousel-image" 
          />
        </div>
      </div>

      
      {normalizedItems.length > 1 && (
        <>
          <button
            className="carousel-control carousel-control-prev"
            onClick={handlePrevious}
          >
            ‹
          </button>

          <button
            className="carousel-control carousel-control-next"
            onClick={handleNext}
          >
            ›
          </button>

          <div className="carousel-indicators">
            {normalizedItems.map((_, index) => (
              <button
                key={index}
                className="carousel-indicator"
                style={{ 
                  backgroundColor: index === currentIndex ? "#c17830" : "#333333" 
                }}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default GameCarousel