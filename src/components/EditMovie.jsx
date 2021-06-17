import React, { Component } from "react";
import Axios from "axios";

let movieURL;

if (process.env.NODE_ENV === "development") {
  movieURL = "http://localhost:3003/movies/";
} else {
  movieURL = "https://stormy-falls-96060.herokuapp.com/movies/";
}

export default class EditMovie extends Component {
  state = {
    title: "",
    year: 0,
    director: "",
    category: "",
  };

  handleChange(event) {
    this.setState({ [event.currentTarget.id]: event.currentTarget.value });
  }

  componentDidMount() {
    this.setState({
      title: this.props.movie.title,
      year: this.props.movie.year,
      director: this.props.movie.director,
      category: this.props.movie.category,
    });
  }

  handleUpdateMovie = async (id) => {
    const payLoad = {
      title: this.state.title,
      year: this.state.year,
      director: this.state.director,
      category: this.state.category,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const movieId = this.props.movie._id;
    console.log(movieId);
    await Axios.put(movieURL + `/${movieId}`, payLoad, {
      headers: headers,
    }).then((res) => {
      console.log(res);
    });
  };

  render() {
    return (
      <div className="body">
        <h1>Edit Favorite Movie</h1>
        <form onSubmit={() => this.handleUpdateMovie()}>
          <label htmlFor="title"></label>
          <input
            type="text"
            id="title"
            defaultValue={this.props.movie.title}
            onChange={(event) => this.handleChange(event)}
            placeholder="Add Title"
          />
          <label htmlFor="year"></label>
          <input
            type="number"
            id="year"
            defaultValue={this.props.movie.year}
            onChange={(event) => this.handleChange(event)}
            placeholder="Add Year"
          />
          <label htmlFor="director"></label>
          <input
            type="text"
            id="director"
            defaultValue={this.props.movie.director}
            onChange={(event) => this.handleChange(event)}
            placeholder="Add Director"
          />
          <label htmlFor="category"></label>
          <input
            type="text"
            id="category"
            defaultValue={this.props.movie.category}
            onChange={(event) => this.handleChange(event)}
            placeholder="Add Category"
          />
          <input type="submit" value="Update Movie" />
        </form>
      </div>
    );
  }
}
