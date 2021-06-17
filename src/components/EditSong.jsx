import React, { Component } from "react";
import Axios from "axios";

let songURL;

if (process.env.NODE_ENV === "development") {
  songURL = "http://localhost:3003/songs/";
} else {
  songURL = "https://stormy-falls-96060.herokuapp.com/songs/";
}

export default class EditSong extends Component {
  state = {
    artist: "",
    song: "",
    likes: this.props.song.likes,
  };

  handleChange(event) {
    this.setState({ [event.currentTarget.id]: event.currentTarget.value });
  }

  componentDidMount() {
    this.setState({
      artist: this.props.song.artist,
      song: this.props.song.song,
      likes: this.props.song.likes,
    });
  }

  handleUpdateSong = async (id) => {
    const payLoad = {
      artist: this.state.artist,
      song: this.state.song,
      likes: this.props.song.likes,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const songId = this.props.song._id;
    console.log(songId);
    await Axios.put(songURL + `/${songId}`, payLoad, { headers: headers }).then(
      (res) => {
        console.log(res);
      }
    );
  };

  render() {
    return (
      <div className="body">
        <h1>Edit Favorite Song</h1>
        <form onSubmit={() => this.handleUpdateSong()}>
          <label htmlFor="artist"></label>
          <input
            type="text"
            id="artist"
            defaultValue={this.props.song.artist}
            onChange={(event) => this.handleChange(event)}
            placeholder="Add Artist"
          />
          <label htmlFor="song"></label>
          <input
            type="text"
            id="song"
            defaultValue={this.props.song.song}
            onChange={(event) => this.handleChange(event)}
            placeholder="Add Song"
          />
          <input type="submit" value="Update Song" />
        </form>
      </div>
    );
  }
}
