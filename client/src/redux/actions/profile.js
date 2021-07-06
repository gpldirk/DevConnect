import {
  GET_PROFILE,
  PROFILE_ERROR,
  SET_LOADING,
  UPDATE_PROFILE,
  DELETE_ACCOUNT,
  CLEAR_PROFILE,
  GET_PROFILES,
  GET_REPOS,
} from './types'
import axios from 'axios'
import { setAlert } from './alert'


const setLoading = () => {
  return {
    type: SET_LOADING,
  }
}

// get current user profile
export const getCurrentProfile = () => async (dispatch) => {
  setLoading()

  try {
    const res = await axios.get('/api/profile/me')
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })

  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      }
    })
  }
}

// get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  })

  setLoading()

  try {
    const res = await axios.get('/api/profile')
    dispatch({
      type: GET_PROFILES,
      payload: res.data
    })

  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      }
    })
  }
}

// get profile by id
export const getProfileById = (userId) => async (dispatch) => {
  setLoading()

  try {
    const res = await axios.get(`/api/profile/${userId}`)
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })

  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      }
    })
  }
}

// get github repos
export const getGithubRepos = (username) => async (dispatch) => {

  setLoading()

  try {
    const res = await axios.get(`/api/profile/github/${username}`)
    dispatch({ 
      type: GET_REPOS,
      payload: res.data
    })

  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      }
    })
  }
}

// create or update profile
export const createOrUpdateProfile = (formData, history, edit = false) => async dispatch => {
  setLoading()

  try {
    const res = await axios.post('/api/profile', formData)
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })

    dispatch(setAlert(edit ? "Profile Updated": "Profile Created", "success"))
    history.push('/dashboard')
    
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg, 'danger'))
      });
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      }
    })
  }
}

// Add Experience
export const addExperience = (formData, history) => async dispatch => {
  setLoading()

  try {
    const res = await axios.put('/api/profile/experience', formData)
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert("Experience Added", "success"))
    history.push('/dashboard')
    
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg, 'danger'))
      });
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      }
    })
  }
}

// Add Education
export const addEducation = (formData, history) => async dispatch => {
  setLoading()

  try {
    const res = await axios.put('/api/profile/education', formData)
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert("Education Added", "success"))
    history.push('/dashboard')
    
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg, 'danger'))
      });
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      }
    })
  }
}

// Delete Experience
export const deleteExperience = (expId) => async dispatch => {
  setLoading()

  try {
    const res = await axios.delete(`/api/profile/experience/${expId}`)
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Experience Deleted', 'success'))
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      }
    })
  }
}

// Delete Education
export const deleteEducation = (eduId) => async dispatch => {
  setLoading()

  try {
    const res = await axios.delete(`/api/profile/education/${eduId}`)
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Education Deleted', 'success'))
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      }
    })
  }
}

// Delete Account
export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure to delete account which cannot be undone?')) {
    setLoading()

    try {
      await axios.delete(`/api/profile`)
      dispatch({
        type: CLEAR_PROFILE,
      })
      dispatch({
        type: DELETE_ACCOUNT,
      })

      dispatch(setAlert('Your account has been deleted'))
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        }
      })
    }
  }
}







