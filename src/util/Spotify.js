import spotifyClientId from './config.js';

const authorizeUrl = 'https://accounts.spotify.com/authorize';
const redirectUri = 'http://localhost:3000/';
const searchUrl = 'https://api.spotify.com/v1/search';
const getUserIdUrl = 'https://api.spotify.com/v1/me';
const scope = 'playlist-modify-private';


const Spotify = {
  accessToken: '',

  getAccessToken() {
    if (this.accessToken) {
      return this.accessToken;
    }

    // Check if the access token is in the URL
    const hash = window.location.hash;
    const accessTokenMatch = hash.match(/access_token=([^&]*)/);
    const expiresInMatch = hash.match(/expires_in=([^&]*)/);

    // If we could extract a valid access token & expiring time,
    // save the values and return the access token. Otherwise,
    // redirect to the authentication login page.
    if (accessTokenMatch && expiresInMatch) {
      this.accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      // Clear the accessToken once it expires
      window.setTimeout(() => this.accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return this.accessToken;
    } else {
      const authenticationUrl =
          `${authorizeUrl}?client_id=${spotifyClientId}&redirect_uri=${
              redirectUri}&scope=${scope}&response_type=token&state=123`;
      window.location = authenticationUrl;
    }
  },

  async getUserId() {
    this.getAccessToken();
    try {
      const response =
          await fetch(getUserIdUrl, {
            method: 'GET',
            headers: new Headers({
              'Authorization': `Bearer ${this.accessToken}`,
            })
          }).catch((networkError) => {console.error(networkError)});
      if (response.ok) {
        const json_response = await response.json();
        if ('id' in json_response) {
          return json_response.id;
        }
        throw new Error('JSON response does not have the key "id".');
      }
      throw new Error('Request failed.');
    } catch (error) {
      console.error(error);
    }
  },

  async search(term) {
    this.getAccessToken();
    const searchTracksUrl = `${searchUrl}?q=${term}&type=track&limit=10`;
    try {
      const response = await fetch(searchTracksUrl, {
                         method: 'GET',
                         headers: new Headers({
                           'Authorization': `Bearer ${this.accessToken}`,
                         })
                       }).catch((networkError) => {
        console.error(networkError);
      });

      if (response.ok) {
        const json_response = await response.json();
        if ('tracks' in json_response && 'items' in json_response.tracks) {
          const track_list = json_response.tracks.items.map((track) => {
            return {
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri
            };
          });
          return track_list;
        }
        throw new Error('JSON response does not have the key "tracks.items".');
      }
      throw new Error('Request failed.');
    } catch (error) {
      console.error(error);
    }
  },

  async createNewPlaylist(name, tracks) {
    const playlistId = await this.postPlaylist(name);
    if (tracks.length > 0) {
      await this.postPlaylistTracks(playlistId, tracks);
    }
  },

  async postPlaylist(name) {
    this.getAccessToken();
    const user_id = await this.getUserId();
    const url = `https://api.spotify.com/v1/users/${user_id}/playlists`;
    try {
      const response = await fetch(url, {
                         method: 'POST',
                         headers: new Headers({
                           'Authorization': `Bearer ${this.accessToken}`,
                           'Content-Type': 'application/json'
                         }),
                         body: JSON.stringify({name: name, public: false})
                       }).catch((networkError) => {
        console.error(networkError);
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        if ('id' in jsonResponse) {
          return jsonResponse.id;
        }
        throw new Error('JSON response does not have the key "id".');
      }
      throw new Error('Request failed.');
    } catch (error) {
      console.error(error);
    }
  },

  async postPlaylistTracks(playlistId, trackUris) {
    this.getAccessToken();
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    try {
      const response =
          await fetch(url, {
            method: 'POST',
            headers: new Headers({
              'Authorization': `Bearer ${this.accessToken}`,
              'Content-Type': 'application/json'
            }),
            body: JSON.stringify({uris: trackUris})
          }).catch((networkError) => {console.error(networkError)});
      if (response.ok) {
        return response;
      }
      throw new Error('Request failed.');
    } catch (error) {
      console.error(error);
    }
  }
}

export default Spotify;