import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./Booking.css";

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to book tickets");
      navigate("/login");
    }

   axios.get(`${import.meta.env.VITE_API_URL}/api/movies/${id}`)
      .then(res => setMovie(res.data));
  }, [id, navigate]);

  const toggleSeat = (seat) => {
    setSelectedSeats(prev =>
      prev.includes(seat)
        ? prev.filter(s => s !== seat)
        : [...prev, seat]
    );
  };

  if (!movie) return null;

  const seatPrice = movie.price.gold; // simple (gold category)
  const totalPrice = selectedSeats.length * seatPrice;

  const confirmBooking = async () => {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/bookings`, {
      movieTitle: movie.title,
      seats: selectedSeats,
      totalPrice,
      userEmail: localStorage.getItem("userEmail")
    });

    alert("Booking Successful");
    navigate("/");
  };

  return (
    <div className="container">
      <h2>{movie.title}</h2>

      <p>🎫 Seat Price: ₹{seatPrice}</p>
      <p>💰 Total Price: ₹{totalPrice}</p>

      <div className="seats">
        {["A1","A2","A3","B1","B2"].map(seat => (
          <div
            key={seat}
            className={`seat ${selectedSeats.includes(seat) ? "selected" : ""}`}
            onClick={() => toggleSeat(seat)}
          >
            {seat}
          </div>
        ))}
      </div>

      <button disabled={selectedSeats.length === 0}
        onClick={confirmBooking}>
        Confirm Booking
      </button>
    </div>
  );
}
