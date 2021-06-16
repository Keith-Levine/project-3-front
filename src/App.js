import React, { Component } from "react";
import Movieform from "./components/Movieform";
import SongForm from "./components/SongForm";
import SearchMovie from './components/SearchMovie';
import { Table } from "react-bootstrap";
import Song from "./components/Song";
import Movie from "./components/Movie";

require('dotenv').config();

let songURL;

if (process.env.NODE_ENV === 'development') {
  songURL = 'http://localhost:3003/songs/';
} else {
  songURL = 'https://stormy-falls-96060.herokuapp.com/songs/';
};

let movieURL;

if (process.env.NODE_ENV === 'development') {
  movieURL = 'http://localhost:3003/movies/';
} else {
  movieURL = 'https://stormy-falls-96060.herokuapp.com/movies/';
};

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: [],
      movies: [],
      showFormMovie: false,
    };
  };

  componentDidMount() {
    this.getSongs();
    this.getMovie();
  };

  //////////////////////////
  //////      Movies
  /////////////////////////

  getMovie() {
    fetch(movieURL)
      .then((res) => {
        return res.json();
      })
      .then((data) => this.setState({ movies: data }));
  };

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
      };
    });
  };

  /////////////////
  // SONGS CODE
  ////////////////

  getSongs() {
    fetch(songURL)
    .then(res => {return res.json()})
    .then(data => {
      this.setState({songs: data})})
  };

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
      };
    });
  };

  render() {
      return (
        <div className="body" >
          <h1>My Favorite Things</h1>
          <h3>Overview
              <p>Keep track of your favorite Songs and Movies with (APP NAME)</p>
          </h3>
          <h3>Favorite Songs</h3>
          <SongForm getSongs={() => this.getSongs()} />
          <br></br>
          <Table striped bordered hover size="sm" >
            <tbody>
              <tr>
                <th>Artist</th>
                <th>Song Title</th>
                <th>Like</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
              {this.state.songs.map((song, id) => {
                return (
                  <Song 
                    song={song}
                    selectedSong={this.state.selectedSong}
                    key={id} 
                    toggleEditSong={(song) => this.toggleEditSong(song)}
                    getSongs={() => this.getSongs} 
                    deleteSong={(id) => this.deleteSong(id)} 
                    showFormSong={this.state.showFormSong}
                  />
                );
              })}
            </tbody>
          </Table>
          <h3>Search For Movie</h3>
          <SearchMovie />
          <h3>Add Favorite Movies</h3>
          <Movieform getMovie={() => this.getMovie()} />
          <br></br>
          <Table striped bordered hover size="sm">
            <tbody >
              <tr>
                <th>Title</th>
                <th>Year</th>
                <th>Director</th>
                <th>Category</th>
                <th>Like</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
              {this.state.movies.map((movie, id) => {
                return (
                  <Movie
                    key={id}
                    movie={movie}
                    selectedMovie={this.state.selectedMovie}  
                    toggleEditMovie={(movie) => this.toggleEditMovie(movie)}
                    getMovie={() => this.getMovie} 
                    deleteMovie={(id) => this.deleteMovie(id)} 
                    showFormMovie={this.state.showFormMovie}
                  />
                );
              })}
            </tbody>
          </Table>
        </div>
      );
  };
};
