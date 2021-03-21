import { Component } from "react";
import Axios from "axios";
import MovieList from "../../views/MovieList";
import styles from "./MoviesPage.module.css";

const apiKey = "82b56d265419aae438fd4f569e97cc4f";

export class MoviesPage extends Component {
  state = {
    query: "",
    page: "",
    movies: [],
  };

  async componentDidMount() {
    if (this.props.location.query) {
      const response = await Axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${this.props.location.query}`
      );
      this.setState({
        movies: response.data.results,
        query: this.props.location.query,
      });
    }
  }
  // handleChangeQuery = (query) => {
  //   this.props.history.push({
  //     ...this.props.location,
  //     search: `query=${query}`,
  //   });
  // };
  handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await formData.forEach((value, name) => {
      this.setState({ query: value });
    });

    const { query } = this.state;

    const response = await Axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${query}`
    );

    this.setState({ movies: response.data.results });
  };

  render() {
    return (
      <>
        <div className={styles.container}>
          <h2 className={styles.title}>Movies Page</h2>
          <form className={styles.form} onSubmit={this.handleSubmit}>
            <input
              type="text"
              autoComplete="off"
              autoFocus
              name="query"
              placeholder="Search movies"
            ></input>
            <button type="submit" className={styles.searchFormButton}>
              {/* Search */}
            </button>
          </form>
          <MovieList
            movies={this.state.movies}
            location={this.props.location}
            query={this.state.query}
          />
        </div>
      </>
    );
  }
}

export default MoviesPage;
