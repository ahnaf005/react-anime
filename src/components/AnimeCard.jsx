import React from 'react'

const AnimeCard = ({ anime: { title, score, images, year, type } }) => {
  return (
    <div className="movie-card">
      <img
        src={images?.jpg?.image_url || '/no-movie.png'}
        alt={title}
      />

      <div className="mt-4">
        <h3>{title}</h3>

        <div className="content">
          <div className="rating">
            <img src="star.svg" alt="Star Icon" />
            <p>{score ? score.toFixed(1) : 'N/A'}</p>
          </div>

          <span>•</span>
          <p className="lang">{type || 'N/A'}</p>

          <span>•</span>
          <p className="year">{year || 'N/A'}</p>
        </div>
      </div>
    </div>
  )
}

export default AnimeCard
