import api from './api';

const bookingService = {
  getTheatres: () => {
    return api.get('/bookings/theatres');
  },

  getShows: (movieId, date) => {
    return api.get('/bookings/shows', { params: { movieId, date } });
  },

  getShowDetails: (showId) => {
    return api.get(`/bookings/shows/${showId}`);
  },

  getSeatLayout: (showId) => {
    return api.get(`/bookings/shows/${showId}/seats`);
  },

  lockSeats: (showId, seatIds) => {
    return api.post(`/bookings/shows/${showId}/lock`, { seatIds });
  },

  createBooking: (bookingData) => {
    return api.post('/bookings', bookingData);
  },

  confirmBooking: (bookingId) => {
    return api.post(`/bookings/${bookingId}/confirm`);
  },

  cancelBooking: (bookingId) => {
    return api.post(`/bookings/${bookingId}/cancel`);
  },

  getUserBookings: () => {
    return api.get('/bookings/my-bookings');
  },

  getBookingById: (bookingId) => {
    return api.get(`/bookings/${bookingId}`);
  }
};

export default bookingService;
