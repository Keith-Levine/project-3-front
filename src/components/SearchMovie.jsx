import React, { Component } from "react";
import MovieInfo from "./MovieInfo";
require("dotenv").config();

const OMDBApiKey = "a6e0eb04";

class SearchMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseURL: "https://www.omdbapi.com/?",
      apikey: "apikey=" + OMDBApiKey,
      query: "&t=",
      movieTitle: "",
      searchURL: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState(
      {
        searchURL:
          this.state.baseURL +
          this.state.apikey +
          this.state.query +
          this.state.movieTitle,
      },
      () => {
        fetch(this.state.searchURL)
          .then((response) => {
            return response.json();
          })
          .then(
            (json) =>
              this.setState({
                movie: json,
                movieTitle: "",
              }),
            (err) => console.log(err)
          );
      }
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="movieTitle"></label>
          <input
            id="movieTitle"
            type="text"
            value={this.state.movieTitle}
            onChange={this.handleChange}
          />
          <input type="submit" value="Find Movie Info" />
        </form>
        <br></br>
        {this.state.movie ? <MovieInfo movie={this.state.movie} /> : ""}
      </div>
    );
  }
}

export default SearchMovie;
