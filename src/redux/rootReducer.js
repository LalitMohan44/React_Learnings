import { combineReducers } from "redux";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import videoReducer from "./video/videoReducer";
import userReducer from "./user/userReducer";

const rootReducer = combineReducers({
    video: videoReducer,
    user: userReducer
})

export default rootReducer