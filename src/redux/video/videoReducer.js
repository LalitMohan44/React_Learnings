import { FETCH_POPULAR_VIDEOS, FETCH_VIDEOS_SUCCESS, FETCH_VIDEOS_FAILURE, SAVE_VIDEO, EMPTY_SAVED_VIDEOS } from "./videoTypes";

const initialState = {
    loading: false,
    videos: [],
    savedVideos: [],
    error: ''
}

const videoReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_VIDEO:
            let stateCopy = JSON.parse(JSON.stringify(state));
            if (!containsVideo(action.payload, stateCopy.savedVideos)) {
                stateCopy.savedVideos.push(action.payload)
            }
          return {
            ...state,
            savedVideos: stateCopy.savedVideos
        }
        case EMPTY_SAVED_VIDEOS: return {
            ...state,
            loading: false,
            videos: [],
            savedVideos: [],
            error: ''
        }

        case FETCH_POPULAR_VIDEOS: return {
            ...state,
            loading: true
        }
        case FETCH_VIDEOS_SUCCESS: return {
            ...state,
            loading: false,
            videos: action.payload,
            error: ''
        }
        case FETCH_VIDEOS_FAILURE: return {
            ...state,
            loading: false,
            videos: [],
            error: action.payload
        }
        default: return state
    }
}

const containsVideo = (obj, list) => {
    const found = list.some(element => {
        if (element.id === obj.id) {
            return true;
        }
        return false
    });

    return found
}

export default videoReducer