import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./MovieDetails.css";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/movies/${id}`)

      .then(res => setMovie(res.data));
  }, []);

  if (!movie) return null;

  const handleBook = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to continue booking");
      navigate("/login");
    } else {
      navigate(`/book/${id}`);
    }
  };

  return (
    <div className="container">
      <div className="movie-details">
        <img src={movie.poster} alt={movie.title} />

        <div className="movie-info">
          <h2>{movie.title}</h2>
          <p>{movie.language}</p>
          <p>{movie.duration}</p>

          <button onClick={handleBook}>Book Tickets</button>
        </div>
      </div>
    </div>
  );
}
