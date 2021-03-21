import { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Axios from "axios";
import styles from "./HomePage.module.css";

const apiKey = "82b56d265419aae438fd4f569e97cc4f";

class HomePage extends Component {
  state = {
    movies: [],
  };

  async componentDidMount() {
    const response = await Axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`
    );

    this.setState({ movies: response.data.results });
    console.log(this.state);
  }

  render() {
    return (
      <>
        <h1 className={styles.title}>Trending today</h1>

        <ul className={styles.movies}>
          {this.state.movies.map((movie) => {
            return (
              <li key={movie.id} className={styles.movieItem}>
                <Link
                  to={{
                    pathname: `/movies/${movie.id}`,
                    state: { from: this.props.location.pathname },
                  }}
                >
                  {movie.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

HomePage.propTypes = {
  movies: PropTypes.array,
};

export default HomePage;
