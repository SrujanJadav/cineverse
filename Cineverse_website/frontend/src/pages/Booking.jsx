import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import bookingService from '../services/bookingService';
import movieService from '../services/movieService';
import { FaClock, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import '../styles/Booking.css';

const Booking = () => {
  const { showId } = useParams();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [movie, setMovie] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initializeBooking();
  }, [showId]);

  const initializeBooking = async () => {
    setLoading(true);
    try {
      // In a real app, fetch show and movie details
      // For now, using mock data
      setMovie({
        id: 1,
        title: 'The Matrix',
        posterUrl: ''
      });
      
      // Generate mock seats
      const mockSeats = generateMockSeats();
      setSeats(mockSeats);
      
      setStep(2);
    } catch (error) {
      console.error('Failed to initialize booking:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateMockSeats = () => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const seatsPerRow = 12;
    const allSeats = [];

    rows.forEach(row => {
      for (let i = 1; i <= seatsPerRow; i++) {
        allSeats.push({
          id: `${row}${i}`,
          row,
          number: i,
          status: Math.random() > 0.7 ? 'booked' : 'available'
        });
      }
    });

    return allSeats;
  };

  const handleSeatClick = (seat) => {
    if (seat.status === 'booked') return;

    if (selectedSeats.find(s => s.id === seat.id)) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleConfirmBooking = async () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }

    setLoading(true);
    try {
      // Lock seats first
      const seatIds = selectedSeats.map(s => s.id);
      await bookingService.lockSeats(showId, seatIds);

      // Create booking
      const bookingData = {
        showId,
        seatIds,
        totalAmount: calculateTotal()
      };
      
      const response = await bookingService.createBooking(bookingData);
      const bookingId = response.data.data.id;

      // Confirm booking
      await bookingService.confirmBooking(bookingId);

      setStep(3);
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    return selectedSeats.length * 250; // ₹250 per seat
  };

  if (loading && step === 1) {
    return (
      <div className="booking-page">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="container">
        <div className="booking-header">
          <h1>Book Your Show</h1>
          <p>{movie?.title}</p>
        </div>

        <div className="booking-steps">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <span className="step-number">1</span>
            <span>Select Show</span>
          </div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <span className="step-number">2</span>
            <span>Select Seats</span>
          </div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span>Confirm</span>
          </div>
        </div>

        <div className="booking-content">
          {step === 2 && (
            <div className="seat-layout glass">
              <div className="screen-indicator">
                <h3>Screen</h3>
                <div className="screen"></div>
              </div>

              <div className="seats-grid">
                {seats.map(seat => (
                  <div
                    key={seat.id}
                    className={`seat ${seat.status} ${
                      selectedSeats.find(s => s.id === seat.id) ? 'selected' : ''
                    }`}
                    onClick={() => handleSeatClick(seat)}
                  >
                    {seat.id}
                  </div>
                ))}
              </div>

              <div className="seat-legend">
                <div className="legend-item">
                  <div className="legend-box" style={{ backgroundColor: 'var(--bg-secondary)', border: '2px solid rgba(255,255,255,0.2)' }}></div>
                  <span>Available</span>
                </div>
                <div className="legend-item">
                  <div className="legend-box" style={{ backgroundColor: 'var(--primary-color)' }}></div>
                  <span>Selected</span>
                </div>
                <div className="legend-item">
                  <div className="legend-box" style={{ backgroundColor: '#555', opacity: 0.5 }}></div>
                  <span>Booked</span>
                </div>
              </div>

              <div className="booking-summary glass" style={{ marginTop: '30px' }}>
                <h3>Booking Summary</h3>
                <div className="summary-item">
                  <span>Selected Seats:</span>
                  <span>{selectedSeats.map(s => s.id).join(', ') || 'None'}</span>
                </div>
                <div className="summary-item">
                  <span>Number of Seats:</span>
                  <span>{selectedSeats.length}</span>
                </div>
                <div className="summary-item">
                  <span>Price per Seat:</span>
                  <span>₹250</span>
                </div>
                <div className="summary-total">
                  <div className="summary-item">
                    <span>Total Amount:</span>
                    <span>₹{calculateTotal()}</span>
                  </div>
                </div>

                <div className="booking-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={handleConfirmBooking}
                    disabled={selectedSeats.length === 0 || loading}
                  >
                    {loading ? 'Processing...' : 'Confirm Booking'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="booking-success glass" style={{ textAlign: 'center', padding: '80px 40px' }}>
              <FaCheckCircle style={{ fontSize: '80px', color: '#2ecc71', marginBottom: '20px' }} />
              <h2>Booking Confirmed!</h2>
              <p>Your tickets have been booked successfully.</p>
              <p style={{ color: 'var(--text-secondary)', marginTop: '20px' }}>
                Redirecting to dashboard...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;
