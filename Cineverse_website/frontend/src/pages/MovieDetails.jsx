import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import movieService from '../services/movieService';
import { FaStar, FaClock, FaCalendar, FaPlay } from 'react-icons/fa';
import '../styles/MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  const fetchMovieDetails = async () => {
    try {
      const response = await movieService.getMovieById(id);
      setMovie(response.data.data);
    } catch (error) {
      console.error('Failed to fetch movie:', error);
      // Mock data fallback
      setMovie({
        id,
        title: 'The Matrix',
        genre: 'Sci-Fi',
        rating: 4.5,
        duration: 136,
        releaseYear: 1999,
        language: 'English',
        description: 'A computer hacker learns about the true nature of reality and his role in the war against its controllers.',
        director: 'Lana Wachowski, Lilly Wachowski',
        cast: 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss',
        posterUrl: ''
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="movie-details-page">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="movie-details-page">
        <div className="container">
          <h2>Movie not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-details-page">
      <div className="movie-backdrop">
        <div className="backdrop-overlay"></div>
      </div>
      
      <div className="container">
        <div className="movie-details-content">
          <div className="movie-poster-large">
            {movie.posterUrl ? (
              <img src={movie.posterUrl} alt={movie.title} />
            ) : (
              <div className="poster-placeholder">
                <span>{movie.title[0]}</span>
              </div>
            )}
          </div>

          <div className="movie-details-info">
            <h1>{movie.title}</h1>
            
            <div className="movie-meta-info">
              <span className="genre-badge">{movie.genre}</span>
              <span className="rating-badge">
                <FaStar /> {movie.rating}
              </span>
              <span className="meta-item">
                <FaClock /> {movie.duration} mins
              </span>
              <span className="meta-item">
                <FaCalendar /> {movie.releaseYear}
              </span>
            </div>

            <p className="movie-description">{movie.description}</p>

            <div className="movie-info-grid">
              <div className="info-item">
                <strong>Director:</strong>
                <span>{movie.director}</span>
              </div>
              <div className="info-item">
                <strong>Cast:</strong>
                <span>{movie.cast}</span>
              </div>
              <div className="info-item">
                <strong>Language:</strong>
                <span>{movie.language}</span>
              </div>
            </div>

            <div className="action-buttons">
              <Link to={`/booking/${id}`} className="btn btn-primary">
                <FaPlay /> Book Tickets
              </Link>
              <button className="btn btn-secondary">Watch Trailer</button>
            </div>
          </div>
        </div>

        <div className="reviews-section">
          <h2>Reviews & Ratings</h2>
          <div className="reviews-placeholder glass">
            <p>No reviews yet. Be the first to review!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
