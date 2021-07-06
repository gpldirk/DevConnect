import {
  GET_PROFILE,
  PROFILE_ERROR,
  SET_LOADING,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_REPOS
} from '../actions/types'

const initialState = {
  profile: null, // 可以为自己/他人的profile
  profiles: [],  // profile list page
  repos: [],  // Github repos for one user
  loading: false,
  error: {},
}


export default function(state = initialState, action) {
  const {type, payload} = action
  switch(type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      }

    case GET_PROFILE:
    case UPDATE_PROFILE:  
      return {
        ...state,
        loading: false,
        profile: payload,
      }

    case PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
        profile: null,
      }

    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null, // 可以为自己/他人的profile
        repos: [],  // Github repos for one user
        loading: false,
      }

    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      }

    case GET_REPOS:
       return {
         ...state,
         repos: payload,
         loading: false,
       }

    default:
      return state
  }
}