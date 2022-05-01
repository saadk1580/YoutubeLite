import * as axios from "axios";

let apiKey = process.env.REACT_APP_API_KEY;
export const baseParams = {
  jquery: "libs/jquery/jquery",
  part: "snippet",
  chart: "mostPopular",
  regionCode: "us",
  maxResults: 200,
  key: apiKey,
};

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
});
