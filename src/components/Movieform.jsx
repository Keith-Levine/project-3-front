import React, { Component } from "react";

let movieURL;

if (process.env.NODE_ENV === "development") {
  movieURL = "http://localhost:3003/movies/";
} else {
  movieURL = "https://stormy-falls-96060.herokuapp.com/movies/";
}
export default class Movieform extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      year: 0,
      director: "",
      category: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.currentTarget.id]: event.currentTarget.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(movieURL, {
      method: "POST",
      body: JSON.stringify({
        title: this.state.title,
        year: this.state.year,
        director: this.state.director,
        category: this.state.category,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.props.getMovie();
        this.setState({
          title: "",
          year: "",
          director: "",
          category: "",
        });
      })
      .catch((error) => console.log({ Error: error }));
  }
  render() {
    return (
      <div>
        <form className="movie_form" onSubmit={this.handleSubmit}>
          <label htmlFor="title"></label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={this.handleChange}
            placeholder="Add Title"
            value={this.state.title}
          ></input>
          <label htmlFor="year"></label>
          <input
            type="number"
            id="year"
            name="year"
            onChange={this.handleChange}
            placeholder="Add Year"
            value={this.state.year}
          ></input>
          <label htmlFor="director"></label>
          <input
            type="text"
            id="director"
            name="director"
            onChange={this.handleChange}
            placeholder="Add Director"
            value={this.state.director}
          ></input>
          <label htmlFor="category"></label>
          <input
            type="text"
            id="category"
            name="category"
            onChange={this.handleChange}
            placeholder="Add Category"
            value={this.state.category}
          ></input>
          <input type="submit" value="Add Movie"></input>
        </form>
      </div>
    );
  }
}
