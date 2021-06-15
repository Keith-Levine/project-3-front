import React, { Component } from 'react'
import Axios from 'axios'

const songURL = 'http://localhost:3003/songs'

export default class EditSong extends Component {
    state = {
        artist: '',
        song: ''
    }

    handleChange (event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value})
    }
    componentDidMount() {
        this.setState({artist: this.props.song.artist, song: this.props.song.song})
    }

    handleUpdateSong=async(id) => {
        const payLoad = {
            artist: this.state.artist,
            song: this.state.song
        }
        const headers = {
            "Content-Type": "application/json"
        }
        const songId = this.props.song._id
        console.log(songId)
        await Axios.put(
            songURL + `/${songId}`, payLoad, {headers: headers})
            .then(res => {console.log(res)})

        // fetch(`${songURL}/${this.props.song._id}`, {
        //     method: 'PUT',
        //     headers: {
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         artist: this.props.song.artist, 
        //         song: this.props.song.song
        //     })
        //   })
        //     .then(res => console.log(res.json()))
            // .then(resJson => {
            //   this.updateSong(resJson)
            // })
            // .then(this.props.toggleEdit)
    }


    // updateSong(resJson) {
    //     const copySong = [...this.props.song]
    //     const findIndex = this.props.song.findIndex(song => song._id === resJson._id)
    //     copySong.splice(findIndex, 1)
    //     this.setState({findIndex: resJson})  
    // }

    render() {
        return (
            <div>        
                <form onSubmit={() => this.handleUpdateSong()}>
                    <label htmlFor="artist"></label>
                    <input 
                        type="text"
                        id="artist"
                        defaultValue = {this.props.song.artist}
                        onChange={(event) => this.handleChange(event)}
                        placeholder = 'Add Artist'
                    />
                    <label htmlFor="song"></label>
                    <input 
                        type="text"
                        id="song" 
                        defaultValue = {this.props.song.song}
                        onChange={(event) => this.handleChange(event)}
                        placeholder = 'Add Song'
                    />
                    <input type="submit" value="Update Song"/>
                </form>              
            </div>
        )
    }
}
