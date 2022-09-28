import axios from "axios";
import { FETCH_POPULAR_VIDEOS, FETCH_VIDEOS_SUCCESS, FETCH_VIDEOS_FAILURE, SAVE_VIDEO,EMPTY_SAVED_VIDEOS } from "./videoTypes";
import { VIDEOS_PER_REQUEST, YOUTUBE_API_KEY } from "../../utils/Utils";

export const request = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
      key: YOUTUBE_API_KEY,
    },
  })

export const saveVideo = (video) => {
    return {
        type: SAVE_VIDEO,
        payload: video
    }
}

export const emptySavedVideos = () => {
    return {
        type: EMPTY_SAVED_VIDEOS
    }
}

export const fetchPopularVideosRequest = () => {
    return {
        type: FETCH_POPULAR_VIDEOS
    }
}

export const fetchPopularVideosSuccess = videos => {
    return {
        type: FETCH_VIDEOS_SUCCESS,
        payload: videos
    }
}

export const fetchPopularVideosFailure = error => {
    return {
        type: FETCH_VIDEOS_FAILURE,
        payload: error
    }
}

export const fetchPopularVideos = () => {
    return (dispatch) => {
        dispatch(fetchPopularVideosRequest);
        request.get('/videos', {
            params: {
              part: 'snippet,contentDetails,statistics',
              chart: 'mostPopular',
              regionCode: 'IN',
              maxResults: VIDEOS_PER_REQUEST,
              // initial value is null so should be fine for 1st request
              pageToken: null,
            }
        })
        .then(res => {
            const videos = res.data
            dispatch(fetchPopularVideosSuccess(videos));
        })
        .catch(err => {
            const errorMsg = err.message
            dispatch(fetchPopularVideosFailure(errorMsg));
        })
    }
}