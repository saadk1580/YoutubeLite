
import * as axios from 'axios'


export const baseParams = {
  jquery: 'libs/jquery/jquery',
  part: "snippet",
  maxResults: 6,
  key: process.env.REACT_APP_API_KEY
}


export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3"
});

