import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const userEmail = localStorage.getItem("userEmail");
  const navigate = useNavigate();

  useEffect(() => {
    // 🔐 Safety check
    if (!userEmail) {
      navigate("/");
      return;
    }

    axios.get(
      `${import.meta.env.VITE_API_URL}/api/bookings/my/${userEmail}`
    )
      .then(res => {
        if (res.data.length === 0) {
          // 🔥 NO BOOKINGS → REDIRECT HOME
          alert("No bookings found");
          navigate("/");
        } else {
          setBookings(res.data);
        }
      });
  }, [navigate, userEmail]);

  const deleteBooking = async (id) => {
    await axios.delete(
  `${import.meta.env.VITE_API_URL}/api/bookings/${id}`
);

    // Re-fetch bookings
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/bookings/my/${userEmail}`
    );

    if (res.data.length === 0) {
      alert("All bookings cancelled");
      navigate("/");
    } else {
      setBookings(res.data);
    }
  };

  return (
    <div className="container">
      <h2>My Bookings</h2>
      <Link to="/">
        <button>Home</button>
      </Link>
      {bookings.map(b => (
        <div
          key={b._id}
          style={{
            background: "#fff",
            padding: "15px",
            margin: "12px 0",
            borderRadius: "6px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div>
            <h3>{b.movieTitle}</h3>
            <p>Seats: {b.seats.join(", ")}</p>
            <p>Total Paid: ₹{b.totalPrice}</p>
          </div>

          <button onClick={() => deleteBooking(b._id)}>
            Cancel
          </button>
        </div>
      ))}
    </div>
  );
}
