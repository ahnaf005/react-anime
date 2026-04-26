import React from 'react'
import { Link } from 'react-router-dom'

const AnimeCard = ({ anime: { mal_id, title, score, images, year, type } }) => {
  return (
    <Link to={`/anime/${mal_id}`} className="movie-card block">
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
    </Link>
  )
}

export default AnimeCard
