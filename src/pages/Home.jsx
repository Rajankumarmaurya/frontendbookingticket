import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/movies`)
      .then(res => setMovies(res.data));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <div className="container">

      {/* 🔥 TITLE + AUTH ACTIONS */}
      <div className="home-header">
        <h1>Movies</h1>

        <div className="auth-inline">
          {!token ? (
            <>
              <Link to="/login">
                <button>Login</button>
              </Link>

              <Link to="/register">
                <button className="outline">Register</button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/my-bookings">
                <button className="outline">My Bookings</button>
              </Link>

              <button onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>

      {/* MOVIES GRID */}
      <div className="movie-grid">
        {movies.map(movie => (
          <div className="movie-card" key={movie._id}>
            <img src={movie.poster} alt={movie.title} />
            <h3>{movie.title}</h3>
            <Link to={`/movie/${movie._id}`}>
              <button>View</button>
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
}
