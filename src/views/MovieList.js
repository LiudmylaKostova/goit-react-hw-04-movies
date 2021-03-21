import { Link } from "react-router-dom";

const MovieList = ({ movies, location, query }) => {
  console.log(location);
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link
            className="Link"
            to={{
              pathname: `/movies/${movie.id}`,
              state: { from: location.pathname, query },
            }}
          >
            {movie.original_title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
