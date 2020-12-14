const API_KEY = "";

function fetchPopular(countryCode) {
  return `https://www.googleapis.com/youtube/v3/videos?part=snippet&part=player&part=statistics&chart=mostPopular&maxResults=50&regionCode=${countryCode}&key=${API_KEY}`;
}

function fetchSearch(query) {
  return `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${query}&type=channel&type=video&key=${API_KEY}`;
}

function fetchChannel(channelId) {
  return `https://www.googleapis.com/youtube/v3/channels?part=snippet&part=statistics&id=${channelId}&key=${API_KEY}`;
}

export default {
  fetchPopular,
  fetchSearch,
  fetchChannel,
};
