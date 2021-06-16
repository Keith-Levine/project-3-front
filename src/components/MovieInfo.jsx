import React, { Component } from 'react';

class MovieInfo extends Component {
    render () {
      return  (
        <div>
          <h1>Title: {this.props.movie.Title}</h1>
          <img src={this.props.movie.Poster} alt={this.props.movie.Title}/>
          <h3>Year: {this.props.movie.Year}</h3>
          <h3>Director: {this.props.movie.Director}</h3>
          <h3>Category: {this.props.movie.Genre}</h3>
          <h4>Plot: {this.props.movie.Plot}</h4>
        </div>
      )
    }
  }

  export default MovieInfo