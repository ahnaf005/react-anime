import { useEffect, useState, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import Spinner from '../components/Spinner.jsx'
import Lightbox from '../components/Lightbox.jsx'

const API_BASE_URL = 'https://api.jikan.moe/v4';

const AnimeDetail = () => {
  const { id } = useParams();

  const [anime, setAnime] = useState(null);
  const [pictures, setPictures] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const galleryPictures = pictures.slice(0, 12);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() => setLightboxIndex(i => (i - 1 + galleryPictures.length) % galleryPictures.length), [galleryPictures.length]);
  const nextImage = useCallback(() => setLightboxIndex(i => (i + 1) % galleryPictures.length), [galleryPictures.length]);

  useEffect(() => {
    const fetchAll = async () => {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const [animeRes, picturesRes, charactersRes] = await Promise.all([
          fetch(`${API_BASE_URL}/anime/${id}/full`),
          fetch(`${API_BASE_URL}/anime/${id}/pictures`),
          fetch(`${API_BASE_URL}/anime/${id}/characters`),
        ]);

        const [animeData, picturesData, charactersData] = await Promise.all([
          animeRes.json(),
          picturesRes.json(),
          charactersRes.json(),
        ]);

        setAnime(animeData.data);
        setPictures(picturesData.data || []);
        setCharacters(charactersData.data || []);
      } catch (error) {
        console.error(`Error fetching anime detail: ${error}`);
        setErrorMessage('Failed to load anime details. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAll();
  }, [id]);

  if (isLoading) {
    return (
      <main>
        <div className="wrapper flex items-center justify-center min-h-screen">
          <Spinner />
        </div>
      </main>
    );
  }

  if (errorMessage || !anime) {
    return (
      <main>
        <div className="wrapper">
          <Link to="/" className="back-btn">← Back</Link>
          <p className="text-red-500 mt-10">{errorMessage || 'Anime not found.'}</p>
        </div>
      </main>
    );
  }

  const mainCharacters = characters.filter(c => c.role === 'Main');
  const supportingCharacters = characters.filter(c => c.role === 'Supporting').slice(0, 12);
  const displayCharacters = mainCharacters.length > 0
    ? [...mainCharacters, ...supportingCharacters]
    : characters.slice(0, 16);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <Link to="/" className="back-btn">← Back</Link>

        {/* Hero */}
        <div className="detail-hero">
          <img
            src={anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url}
            alt={anime.title}
            className="detail-poster"
          />

          <div className="detail-info">
            <h1 className="detail-title">{anime.title}</h1>
            {anime.title_english && anime.title_english !== anime.title && (
              <p className="detail-title-en">{anime.title_english}</p>
            )}

            <div className="detail-meta">
              {anime.score && (
                <span className="meta-badge">
                  <img src="/star.svg" alt="score" className="inline w-4 h-4 mr-1" />
                  {anime.score.toFixed(1)}
                </span>
              )}
              {anime.type && <span className="meta-badge">{anime.type}</span>}
              {anime.episodes && <span className="meta-badge">{anime.episodes} eps</span>}
              {anime.year && <span className="meta-badge">{anime.year}</span>}
              {anime.status && <span className="meta-badge">{anime.status}</span>}
            </div>

            {anime.genres?.length > 0 && (
              <div className="detail-genres">
                {anime.genres.map(g => (
                  <span key={g.mal_id} className="genre-tag">{g.name}</span>
                ))}
              </div>
            )}

            {anime.synopsis && (
              <p className="detail-synopsis">{anime.synopsis}</p>
            )}

            {anime.studios?.length > 0 && (
              <p className="detail-studio">
                Studio: <span className="text-white">{anime.studios.map(s => s.name).join(', ')}</span>
              </p>
            )}
          </div>
        </div>

        {/* Image Gallery */}
        {pictures.length > 0 && (
          <section className="detail-section">
            <h2>Gallery</h2>
            <div className="gallery-grid">
              {galleryPictures.map((pic, i) => (
                <button
                  key={i}
                  className="gallery-btn"
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`Open image ${i + 1}`}
                >
                  <img
                    src={pic.jpg?.large_image_url || pic.jpg?.image_url}
                    alt={`${anime.title} screenshot ${i + 1}`}
                    className="gallery-img"
                  />
                </button>
              ))}
            </div>
          </section>
        )}

        {lightboxIndex !== null && (
          <Lightbox
            images={galleryPictures}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}

        {/* Characters */}
        {displayCharacters.length > 0 && (
          <section className="detail-section">
            <h2>Characters</h2>
            <div className="characters-grid">
              {displayCharacters.map(({ character, role }) => (
                <div key={character.mal_id} className="character-card">
                  <img
                    src={character.images?.jpg?.image_url || '/no-movie.png'}
                    alt={character.name}
                    className="character-img"
                  />
                  <div className="character-info">
                    <p className="character-name">{character.name}</p>
                    <p className="character-role">{role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default AnimeDetail
