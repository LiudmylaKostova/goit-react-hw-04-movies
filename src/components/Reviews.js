import { Component } from "react";
import Axios from "axios";
import PropTypes from "prop-types";

const apiKey = "82b56d265419aae438fd4f569e97cc4f";

class Reviews extends Component {
  state = {
    reviews: [],
  };

  async componentDidMount() {
    const reviews = await Axios.get(
      `https://api.themoviedb.org/3/movie/${this.props.match.params.movieId}/reviews?api_key=${apiKey}&language=en-US&page=1`
    );
    this.setState({ reviews: reviews.data.results });
  }

  render() {
    return (
      <>
        {(this.state.reviews.length && (
          <ul>
            {this.state.reviews.map((review) => (
              <li key={review.id}>
                <h3 className="title">Author: {review.author}</h3>
                <p className="text">{review.content}</p>
              </li>
            ))}
          </ul>
        )) || <p className="text">We don't have any reviews for this movie.</p>}
      </>
    );
  }
}

Reviews.propTypes = {
  reviews: PropTypes.array,
};

export default Reviews;
