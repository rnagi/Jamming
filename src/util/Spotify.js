import React from 'react';


let CLIENT_ID = 'ac12a8340aaa4e2690c999d9396cd48b';
let REDIRECT_URI = 'http://localhost:3000/';

let accessToken = "";

const Spotify  = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        let accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        let expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            window.setTimeout(() => accessTokenMatch = '', expiresInMatch * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const access_url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
            window.location = access_url;
        }
    },

    search(term) {
        fetch('https://api.spotify.com/v1/search?type=track&q=term', {
            headers: { Authorization: `Bearer ${accessToken}` }
        }).then(function (response) {
            return response.json();
        }).then(function (jsonResponse) {
            return jsonResponse.tracks.items.map(track =>
                ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                })
            )
        }).catch(function (error) {
            return [];
        });
    },

    savePlaylist(playlist, trackURIs) {
        if (!playlist && !trackURIs) {
            return;
        }
        let accessToken = accessToken;
        let headers = { Authorization: `Bearer ${accessToken}` };
        let user_id = '';

        fetch('https://api.spotify.com/v1/me', {
            headers: headers
        }).then(function (response) {
            return response.json();
        }).then(function (jsonResponse) {
            user_id = jsonResponse.Id;
        });


        fetch(`'https://api.spotify.com/v1/users/${user_id}/playlists`, {
            method: 'POST',
            body: JSON.stringify({ name: playlist }),
            headers: { Authorization: `Bearer ${accessToken}` }
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Request failed!');
        }, newtorkError => console.log(newtorkError.message)
        ).then(jsonResponse => {
            let playlistId = jsonResponse.id;
        });
    }
}

export default Spotify;