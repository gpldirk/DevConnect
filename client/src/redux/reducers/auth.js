
import {
  REGISTER_SUCCESS,
  SET_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  DELETE_ACCOUNT,
} from '../actions/types.js'


const initialState = {
  token: localStorage.getItem('token'),
  isAuth: false,
  loading: false,
  user: null,
}

export default function(state = initialState, action) {
  const { type, payload } = action
  switch(type) {
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        ...payload,
        isAuth: true,
        loading: false,
      }

    case AUTH_ERROR:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuth: false,
        loading: false,
        user: null,
      }

    case SET_LOADING:
      return {
        ...state,
        loading: true,
      }

    case USER_LOADED:
      return {
        ...state,
        isAuth: true,
        loading: false,
        user: payload,
      }

    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        ...payload,
        isAuth: true,
        loading: false,
      }

    case LOGOUT:
    case DELETE_ACCOUNT:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuth: false,
        loading: false,
        user: null,
      }

    default:
      return state 
  }
}
