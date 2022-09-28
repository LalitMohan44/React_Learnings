import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, LOGIN_REQUEST } from "./userTypes"

const initialState = {
    loading: false,
    isLoggedIn: false,
    user: null
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_REQUEST: return {
            ...state,
            loading: true
        }
        case LOGIN_SUCCESS: return {
            loading: false,
            isLoggedIn: true,
            user: action.payload
        }
        case LOGIN_FAILURE:
        case LOGOUT: return {
            loading: false,
            isLoggedIn: false,
            user: null
        }
        default: return state
    }
}

export default userReducer