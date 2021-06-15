import React, { Component } from "react";
import Movieform from "./components/Movieform";
import SongForm from "./components/SongForm";
import EditSong from './components/EditSong'

require('dotenv').config();

let baseURL;

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003/songs/';
} else {
  baseURL = 'https://stormy-falls-96060.herokuapp.com/';
}

// let baseURL;

// if (process.env.NODE_ENV === 'development') {
//   baseURL = 'http://localhost:3003/movies/';
// } else {
//   baseURL = 'https://stormy-falls-96060.herokuapp.com/';
// }



// = "http://localhost:3003/songs/"
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: [],
      movies: [],
      showForm: false
    }

  }

  //////////////
  /// Movies
  //////////////

  // handleAddMovie(movie) {
  //   const copyMovie = [...this.state.movies]
  //   copyMovie.unshift(movie)
  //   this.setState({
  //     movies: copyMovie,
  //   })
  // }


  // getMovie() {
  //   console.log('hello')
  //   fetch(baseURL)
  //   .then(res => {return res.json()})
  //   .then(data => this.setState({movies: data}))
  // }

  deleteMovie(id) {
    fetch(baseURL + id, {
      method: 'DELETE'
    })
      .then( res => {
        if(res.status === 200) {
          const findIndex = this.state.movies.findIndex(movie => movie._id === id)
          const copyMovies = [...this.state.movies]
          copyMovies.splice(findIndex, 1)
          this.setState({
            movies: copyMovies
          })
        }
      })
  }

  /////////////////
  // SONGS CODE
  ////////////////

  componentDidMount(){
    this.getSongs()
    // this.getMovie()
  }

  // handleAddSong (song) {
  //   const copySongs = [...this.state.songs]
  //   copySongs.unshift(song)
  //   this.setState({
  //     song: copySongs,
  //   })
  // }

  getSongs() {
    console.log(baseURL)
    fetch(baseURL)
    .then(res => {return res.json()})
    .then(data => {
      this.setState({songs: data})})
  }

  deleteSong(id) {
    fetch(baseURL + id, {
      method: 'DELETE'
    })
      .then( res => {
        if(res.status === 200) {
          const findIndex = this.state.songs.findIndex(song => song._id === id)
          const copySongs = [...this.state.songs]
          copySongs.splice(findIndex, 1)
          this.setState({
            songs: copySongs
          })
        }
      })
  }

  toggleEdit(song) {
    console.log('test')
    this.setState({showForm: !this.state.showForm, selectedSong: song}, () => {this.getSongs()})
  }

  render() {
    if(this.state.showForm) {
      return (
        <EditSong toggleEdit={this.toggleEdit} song={this.state.selectedSong} />
      )
    } else {return (
      <div>
        <h1>My favorite things</h1>
        <h3>Favorite Songs</h3>
        <SongForm  getSongs={() => this.getSongs()}/>
        <table>
          <tbody>
            { this.state.songs.map(song => {
              return (
                  <tr key={song._id} >
                    <td>{song.artist}</td>
                    <td>{song.song}</td>
                    <td><button onClick={() => this.toggleEdit(song)} >&#9997;</button></td>
                    <td><button onDoubleClick={() => this.deleteSong(song._id)}>&#128465;</button></td>
                  </tr>
              )
            })
            }
          </tbody>
        </table>
        <h3>Favorite Movies</h3>
        <Movieform getMovie = { () => this.getMovie() } />
        <table>
          <tbody>
            {this.state.movies.map(movie => {
              return (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.year}</td>
                  <td>{movie.director}</td>
                  <td>{movie.category}</td>
                  <td><button onDoubleClick={() => this.deleteMovie(movie._id)}>&#128465;</button></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )}
    
  }
}

