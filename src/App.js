import React, { Component } from "react";
import Movieform from "./components/Movieform";
import SongForm from "./components/SongForm";
import EditSong from "./components/EditSong";
import EditMovie from "./components/EditMovie";
import { Table } from "react-bootstrap";

const songURL = "http://localhost:3003/songs/";
const movieURL = "http://localhost:3003/movies/";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: [],
      movies: [],
      showFormSong: false,
      showFormMovie: false,
    };
  }

  componentDidMount() {
    this.getSongs();
    this.getMovie();
  }

  //////////////////////////
  //////      Movies
  /////////////////////////

  // handleAddMovie(movie) {
  //   const copyMovie = [...this.state.movies]
  //   copyMovie.unshift(movie)
  //   this.setState({
  //     movies: copyMovie,
  //   })
  // }

  getMovie() {
    console.log("hello");
    fetch(movieURL)
      .then((res) => {
        return res.json();
      })
      .then((data) => this.setState({ movies: data }));
  }

  deleteMovie(id) {
    fetch(movieURL + id, {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 200) {
        const findIndex = this.state.movies.findIndex(
          (movie) => movie._id === id
        );
        const copyMovies = [...this.state.movies];
        copyMovies.splice(findIndex, 1);
        this.setState({
          movies: copyMovies,
        });
      }
    });
  }

  toggleEditMovie(movie) {
    console.log("test");
    this.setState(
      { showFormMovie: !this.state.showFormMovie, selectedMovie: movie },
      () => {
        this.getMovie();
      }
    );
  }

  /////////////////
  // SONGS CODE
  ////////////////

  // handleAddSong (song) {
  //   const copySongs = [...this.state.songs]
  //   copySongs.unshift(song)
  //   this.setState({
  //     song: copySongs,
  //   })
  // }

  getSongs() {
    fetch(songURL)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({ songs: data });
      });
  }

  deleteSong(id) {
    fetch(songURL + id, {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 200) {
        const findIndex = this.state.songs.findIndex((song) => song._id === id);
        const copySongs = [...this.state.songs];
        copySongs.splice(findIndex, 1);
        this.setState({
          songs: copySongs,
        });
      }
    });
  }

  toggleEditSong(song) {
    console.log("test");
    this.setState(
      { showFormSong: !this.state.showFormSong, selectedSong: song },
      () => {
        this.getSongs();
      }
    );
  }

  render() {
    if (this.state.showFormSong) {
      return (
        <EditSong
          toggleEditSong={this.toggleEditSong}
          song={this.state.selectedSong}
        />
      );
    } else if (this.state.showFormMovie) {
      return (
        <EditMovie
          toggleEditMovie={this.toggleEditMovie}
          movie={this.state.selectedMovie}
        />
      );
    } else {
      return (
        <div className="body" >
          <h1>My Favorite Things</h1>
          <h3>Favorite Songs</h3>
          <SongForm getSongs={() => this.getSongs()} />
          <br></br>

          <Table striped bordered hover size="sm" >
            <tbody>
              <tr>
                <th>Artist</th>
                <th>Song Title</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            
              {this.state.songs.map((song) => {
                return (
                  <tr key={song._id}>
                    <td>{song.artist}</td>
                    <td>{song.song}</td>
                    <td>
                      <button onClick={() => this.toggleEditSong(song)}>
                        &#9997;
                      </button>
                    </td>
                    <td>
                      <button onDoubleClick={() => this.deleteSong(song._id)}>
                        &#128465;
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <h3>Favorite Movies</h3>
          <Movieform getMovie={() => this.getMovie()} />
          <br></br>

          <Table striped bordered hover size="sm">
            <tbody >
              <tr>
                <th>Title</th>
                <th>Year</th>
                <th>Director</th>
                <th>Category</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            
              {this.state.movies.map((movie) => {
                return (
                  <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.year}</td>
                    <td>{movie.director}</td>
                    <td>{movie.category}</td>
                    <td>
                      <button onClick={() => this.toggleEditMovie(movie)}>
                        &#9997;
                      </button>
                    </td>
                    <td>
                      <button onDoubleClick={() => this.deleteMovie(movie._id)}>
                        &#128465;
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      );
    }
  }
}
