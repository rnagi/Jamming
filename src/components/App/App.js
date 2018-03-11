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
      searchResults: [{ name: 'track', artist: 'artist', album: 'album' }],
      playlistName: 'myplay',
      playlistTracks: [{ name: 'track1', artist: 'artist1', album: 'album1' }]
    };
    this.addTrack = this.addTrack.bind(this);
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
    let tracks = this.state.playlistTracks;
    //console.log(tracks);
    if (tracks.filter(track => track.name === track.name)) {
      this.setState({ playlistTracks: tracks });
    }

  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    let tracks = this.state.playlistTracks;
    let trackUri = [];
    tracks.forEach(function (track) {
      trackUri.push(track.uri);
    });

    Spotify.savePlaylist('myplaylist', tracks);
    this.setState(
      {
        playlistName: 'New Playlist',
        searchResults: []
      });
  }

  search(term) {
    //console.log(term);
    Spotify.search(term).then(function (tracks) {
      this.setState({ searchResults: tracks })
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
