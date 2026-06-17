import api from './api';

const movieService = {
  getAllMovies: (params = {}) => {
    return api.get('/movies', { params });
  },

  getMovieById: (id) => {
    return api.get(`/movies/${id}`);
  },

  searchMovies: (query, params = {}) => {
    return api.get('/movies/search', { params: { query, ...params } });
  },

  addReview: (movieId, reviewData) => {
    return api.post(`/movies/${movieId}/reviews`, reviewData);
  },

  getReviews: (movieId) => {
    return api.get(`/movies/${movieId}/reviews`);
  },

  createMovie: (movieData) => {
    return api.post('/movies', movieData);
  },

  updateMovie: (id, movieData) => {
    return api.put(`/movies/${id}`, movieData);
  },

  deleteMovie: (id) => {
    return api.delete(`/movies/${id}`);
  },

  uploadPoster: (movieId, file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(`/movies/${movieId}/poster`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};

export default movieService;
