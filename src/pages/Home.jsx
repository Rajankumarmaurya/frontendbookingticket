import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import "./Home.css";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); // 🔥 loader only here
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/movies`)
      .then(res => {
        setMovies(res.data);
        setLoading(false); // 🔥 stop loader
      })
      .catch(() => setLoading(false));
  }, []);

  // 🔥 ONLY HOME PAGE LOADER
  if (loading) return <Loader />;

  return (
    <div className="container">
      <div className="home-header">
        <h1>Movies</h1>

        <div className="auth-inline">
          {!token ? (
            <>
              <Link to="/login"><button>Login</button></Link>
              <Link to="/register"><button className="outline">Register</button></Link>
            </>
          ) : (
            <>
              <Link to="/my-bookings"><button className="outline">My Bookings</button></Link>
              <button onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>

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
