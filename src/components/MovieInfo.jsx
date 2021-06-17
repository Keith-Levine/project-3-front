import React, { Component } from "react";

class MovieInfo extends Component {
  render() {
    return (
      <div>
        <img src={this.props.movie.Poster} alt={this.props.movie.Title} />
        <br></br>
        <h5>
          <strong>Title:</strong> {this.props.movie.Title}
        </h5>
        <h5>
          <strong>Year:</strong> {this.props.movie.Year}
        </h5>

        <h5>
          <strong>Director:</strong> {this.props.movie.Director}
        </h5>

        <h5>
          <strong>Category:</strong> {this.props.movie.Genre}
        </h5>
        <h5>
          <strong>Plot:</strong> {this.props.movie.Plot}
        </h5>
      </div>
    );
  }
}

export default MovieInfo;
