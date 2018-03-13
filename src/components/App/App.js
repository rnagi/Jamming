import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../PlayList/PlayList';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: [],
      playlistName: 'myplay',
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (!tracks.includes(track)) {
      tracks.push(track);
      this.setState({ playlistTracks: tracks });
    }
  }

  removeTrack(track) {
    this.setState(prevState => {
      const filteredArray = prevState.playlistTracks.filter(t => t.id !== track.id)
      return {
        playlistTracks: filteredArray
      }
    })
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    let tracks = this.state.playlistTracks;
   // console.log("tacksinplaylist: " + tracks);
    let trackUri = [];
    tracks.forEach(function (track) {
      trackUri.push(track.uri);
    });

    Spotify.savePlaylist(this.state.playlistName, trackUri);
    this.setState({
        playlistName: 'New Playlist',
        searchResults: []
      });
  }

  search(term) {
    //console.log(term);
    Spotify.search(term).then(tracks => {
    //  console.log("tracks from search: " + tracks);
      this.setState({ searchResults: tracks });
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          {/*Add a SearchBar component*/}
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            {/* Add a SearchResults component*/}
            <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults} />
            {/* Add a Playlist component */}
            <PlayList playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
