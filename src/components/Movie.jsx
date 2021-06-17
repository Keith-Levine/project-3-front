import React, { Component } from "react";
import EditMovie from "./EditMovie";

export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFormMovie: false,
      likes: 0,
    };
  }

  toggleEditMovie(movie) {
    console.log("test");
    this.setState(
      { showFormMovie: !this.state.showFormMovie, selectedMovie: movie },
      () => {
        this.props.getMovie();
      }
    );
  }

  toggleAddLike() {
    const addLike = this.state.likes + 1;

    this.setState({ likes: addLike });
  }

  render() {
    if (this.state.showFormMovie) {
      return (
        <EditMovie
          toggleEditMovie={(movie) => this.toggleEditMovie(movie)}
          movie={this.props.movie}
        />
      );
    } else {
      return (
        <tr key={this.props.movie._id}>
          <td>{this.props.movie.title}</td>
          <td>{this.props.movie.year}</td>
          <td>{this.props.movie.director}</td>
          <td>{this.props.movie.category}</td>
          <td>
            <button onClick={() => this.toggleAddLike(this.props.movie._id)}>
              &#128077;
            </button>
            &nbsp;&nbsp;&nbsp;{this.state.likes}
          </td>
          <td>
            <button
              onClick={(movie) => this.toggleEditMovie(this.props.movie._id)}
            >
              &#9997;
            </button>
          </td>
          <td>
            <button
              onDoubleClick={() => this.props.deleteMovie(this.props.movie._id)}
            >
              &#128465;
            </button>
          </td>
        </tr>
      );
    }
  }
}
