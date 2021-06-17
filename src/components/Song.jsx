import React, { Component } from "react";
import EditSong from "./EditSong";

export default class Song extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFormSong: false,
      likes: 0,
    };
  }

  toggleAddLike() {
    const addLike = this.state.likes + 1;

    this.setState({ likes: addLike });
  }

  toggleEditSong(song) {
    console.log("test");
    this.setState(
      { showFormSong: !this.state.showFormSong, selectedSong: song },
      () => {
        this.props.getSongs();
      }
    );
  }

  render() {
    if (this.state.showFormSong) {
      return (
        <EditSong
          toggleEditSong={(song) => this.toggleEditSong(song)}
          song={this.props.song}
        />
      );
    } else {
      return (
        <tr key={this.props.song._id}>
          <td>{this.props.song.artist}</td>
          <td>{this.props.song.song}</td>
          <td>
            <button onClick={() => this.toggleAddLike(this.props.song._id)}>
              &#128077;
            </button>
            &nbsp;&nbsp;&nbsp;{this.state.likes}
          </td>
          <td>
            <button
              onClick={(song) => this.toggleEditSong(this.props.song._id)}
            >
              &#9997;
            </button>
          </td>
          <td>
            <button
              onDoubleClick={(id) => this.props.deleteSong(this.props.song._id)}
            >
              &#128465;
            </button>
          </td>
        </tr>
      );
    }
  }
}
