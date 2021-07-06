import {
  REGISTER_SUCCESS,
  SET_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_PROFILE
} from '../actions/types.js'
import axios from 'axios'
import { setAlert } from './alert'
import setAuthToken from '../../utils/setAuthToken'

export const setLoading = () => {
  return {
    type: SET_LOADING,
  }
}

// Register user
export const register = ({name, email, password}) => async dispatch => {
  setLoading()

  try {
    const res = await axios.post('/api/auth', {
      name, email, password
    })

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data  // {token: }
    })

    loadUser()
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg, 'danger'))
      });
    }

    dispatch({
      type: AUTH_ERROR,
    })
  }
}


// Load user
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  setLoading()

  try {
    const res = await axios.get('/api/users')
    dispatch({
      type: USER_LOADED,
      payload: res.data
    })

  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    })
  }
}

// Login user
export const login = (email, password) => async dispatch => {
  setLoading()

  try {
    const res = await axios.post('/api/users', {
      email, password
    })
    
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    })

    loadUser()
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg, 'danger'))
      });
    }

    dispatch({
      type: AUTH_ERROR,
    })
  }
}

// Logout user && clear profile
export const logout = () => dispatch => {
  dispatch({
    type: CLEAR_PROFILE,
  })

  dispatch({
    type: LOGOUT,
  })
}




