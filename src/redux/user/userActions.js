import { LOGIN_REQUEST,LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "./userTypes"

export const userLoginRequest = () => {
    return {
        type: LOGIN_REQUEST
    }
}

export const userLoginSuccess = (user) => {
    return {
        type: LOGIN_SUCCESS,
        payload: user
    }
}

export const userLoginFailure = (error) => {
    return {
        type: LOGIN_FAILURE,
        payload: error
    }
}

export const userLogout = () => {
    return {
        type: LOGOUT
    }
}