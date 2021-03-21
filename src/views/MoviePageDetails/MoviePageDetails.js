import { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Axios from "axios";
import Cast from "../../components/Cast";
import Reviews from "../../components/Reviews";
import styles from "./MoviePageDetails.module.css";

const apiKey = "82b56d265419aae438fd4f569e97cc4f";

class MoviePageDetails extends Component {
  state = {
    genres: [],
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    const response = await Axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
    );
    const {
      original_title,
      poster_path,
      title,
      overview,
      popularity,
      genres,
    } = response.data;

    this.setState({
      // ...response.data,
      poster_path,
      popularity,
      genres,
      overview,

      title: original_title ? original_title : title,
      from: this.props.location.state.from,
      query: this.props.location.state.query,
    });
  }
  handleClick() {
    this.props.history.push({
      pathname: this.state.from,
      query: this.state.query,
      search: this.state.query ? `query=${this.state.query}` : "",
    });
  }

  render() {
    return (
      <>
        <button onClick={() => this.handleClick()} className={styles.button}>
          Go Back
        </button>
        <div className={styles.movieCard}>
          <img
            src={`https://image.tmdb.org/t/p/w300${this.state.poster_path}`}
            alt="{Постер фильма}"
          />
          <div className={styles.descr}>
            <h1> {this.state.title}</h1>
            <p>{this.state.popularity}</p>
            <h3>Overview</h3>
            <p>{this.state.overview}</p>
            <h3>Genres</h3>
            <ul className={styles.genres}>
              {this.state.genres.map((el) => {
                return (
                  <li key={el.id} className={styles.genresItem}>
                    {el.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div>
          <h2 className={styles.title}>Additional information</h2>
          <ul className={styles.links}>
            <Link to={`${this.props.match.url}/cast`}>
              <li key={"cast"}>Cast</li>
            </Link>

            <Link to={`${this.props.match.url}/reviews`}>
              <li key={"reviews"}>Reviews</li>
            </Link>
          </ul>
        </div>

        <Switch>
          <Route path={`${this.props.match.path}/cast`} component={Cast} />
          <Route
            path={`${this.props.match.path}/reviews`}
            component={Reviews}
          />
        </Switch>
      </>
    );
  }
}

export default MoviePageDetails;
