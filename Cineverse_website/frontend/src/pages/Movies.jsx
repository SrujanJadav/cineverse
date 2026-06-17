import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import movieService from '../services/movieService';
import { FaStar, FaSearch } from 'react-icons/fa';
import '../styles/Movies.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    genre: '',
    sortBy: 'title',
    page: 0,
    size: 12
  });

  useEffect(() => {
    fetchMovies();
  }, [filters]);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await movieService.getAllMovies(filters);
      setMovies(response.data.data?.content || response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
      // Use mock data if API fails
      setMovies(getMockMovies());
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      try {
        const response = await movieService.searchMovies(searchQuery, filters);
        setMovies(response.data.data?.content || response.data.data || []);
      } catch (error) {
        console.error('Search failed:', error);
      }
    } else {
      fetchMovies();
    }
  };

  const getMockMovies = () => [
    { id: 1, title: 'The Matrix', genre: 'Sci-Fi', rating: 4.5, duration: 136, posterUrl: '', releaseYear: 1999 },
    { id: 2, title: 'Inception', genre: 'Thriller', rating: 4.8, duration: 148, posterUrl: '', releaseYear: 2010 },
    { id: 3, title: 'The Dark Knight', genre: 'Action', rating: 4.9, duration: 152, posterUrl: '', releaseYear: 2008 },
    { id: 4, title: 'Interstellar', genre: 'Sci-Fi', rating: 4.7, duration: 169, posterUrl: '', releaseYear: 2014 },
    { id: 5, title: 'Pulp Fiction', genre: 'Drama', rating: 4.6, duration: 154, posterUrl: '', releaseYear: 1994 },
    { id: 6, title: 'Fight Club', genre: 'Drama', rating: 4.7, duration: 139, posterUrl: '', releaseYear: 1999 }
  ];

  return (
    <div className="movies-page">
      <div className="container">
        <div className="movies-header">
          <h1>Explore Movies</h1>
          <p>Discover the latest blockbusters and timeless classics</p>
        </div>

        <div className="movies-controls">
          <form onSubmit={handleSearch} className="search-bar glass">
            <FaSearch />
            <input
              type="text"
              placeholder="Search for movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Search</button>
          </form>

          <div className="filters">
            <select
              value={filters.genre}
              onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
              className="filter-select"
            >
              <option value="">All Genres</option>
              <option value="Action">Action</option>
              <option value="Comedy">Comedy</option>
              <option value="Drama">Drama</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Thriller">Thriller</option>
              <option value="Horror">Horror</option>
            </select>

            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              className="filter-select"
            >
              <option value="title">Title</option>
              <option value="rating">Rating</option>
              <option value="releaseYear">Release Year</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="spinner"></div>
        ) : (
          <div className="movies-grid">
            {movies.map((movie) => (
              <Link to={`/movies/${movie.id}`} key={movie.id} className="movie-card glass">
                <div className="movie-poster">
                  {movie.posterUrl ? (
                    <img src={movie.posterUrl} alt={movie.title} />
                  ) : (
                    <div className="movie-placeholder">
                      <span>{movie.title[0]}</span>
                    </div>
                  )}
                  <div className="movie-overlay">
                    <button className="btn btn-primary">View Details</button>
                  </div>
                </div>
                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <div className="movie-meta">
                    <span className="movie-genre">{movie.genre}</span>
                    <span className="movie-rating">
                      <FaStar /> {movie.rating || 'N/A'}
                    </span>
                  </div>
                  <p className="movie-year">{movie.releaseYear}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;
