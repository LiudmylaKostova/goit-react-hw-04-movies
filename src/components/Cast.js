import { Component } from "react";
import Axios from "axios";
import PropTypes from "prop-types";
import styles from "./Cast.module.css";

const apiKey = "82b56d265419aae438fd4f569e97cc4f";

class Cast extends Component {
  state = {
    actors: [],
  };

  async componentDidMount() {
    const actors = await Axios.get(
      `https://api.themoviedb.org/3/movie/${this.props.match.params.movieId}/credits?api_key=${apiKey}`
    );

    this.setState({ actors: actors.data.cast });
  }

  render() {
    return (
      <>
        {(this.state.actors.length && (
          <ul>
            {this.state.actors.map((actor) => {
              return (
                <li key={actor.cast_id}>
                  {actor.profile_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                      alt={actor.name}
                      className={styles.img}
                    />
                  )}
                  <h3 className={styles.name}> {actor.name}</h3>
                  <p className={styles.descr}>Character: {actor.character}</p>
                </li>
              );
            })}
          </ul>
        )) || (
          <p className={styles.text}>
            The resource you requested is not possible to find.
          </p>
        )}
      </>
    );
  }
}

Cast.propTypes = {
  actors: PropTypes.array,
};

export default Cast;
