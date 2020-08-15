import spotifyClientId from './config.js';

const authorizeUrl = 'https://accounts.spotify.com/authorize';
const redirectUri = 'http://localhost:3000/';
const scope = 'playlist-modify-private';
const searchUrl = 'https://api.spotify.com/v1/search';

let accessToken = '';

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    // Check if the access token is in the URL
    const hash = window.location.hash;
    const accessTokenMatch = hash.match(/access_token=([^&]*)/);
    const expiresInMatch = hash.match(/expires_in=([^&]*)/);

    // If we could extract a valid access token & expiring time,
    // save the values and return the access token. Otherwise,
    // redirect to the authentication login page.
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      // Clear the accessToken once it expires
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const authenticationUrl =
          `${authorizeUrl}?client_id=${spotifyClientId}&redirect_uri=${
              redirectUri}&scope=${scope}&response_type=token&state=123`;
      window.location = authenticationUrl;
    }
  },

  async getUserId() {
    this.getAccessToken();
    const response = await fetch('https://api.spotify.com/v1/me', {
      method: 'get',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
      })
    });
    const data = await response.json();
    return data.id
  },

  async search(term) {
    const url =
        `${searchUrl}?q=${term}&type=album,artist,track&limit=10&offset=5`
    const response = await fetch(url, {
      method: 'get',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
      })
    });
    const data = await response.json();
    return data;
  }
}

export default Spotify;