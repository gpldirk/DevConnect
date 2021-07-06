import {
  DELETE_POST,
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from './types'
import axios from 'axios'
import { setAlert } from './alert'


// Get posts
export const getPosts = () => async (dispatch) => {

  try {
    const res = await axios.get('/api/posts')
    dispatch({
      type: GET_POSTS,
      payload: res.data
    })

  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      }
    })
  }
}

// Add likes
export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`)
    dispatch({
      type: UPDATE_LIKES,
      payload: {
        id: postId, 
        likes: res.data
      }
    })

  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      }
    })
  }
}

// Remove likes
export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postId}`)
    dispatch({
      type: UPDATE_LIKES,
      payload: {
        id: postId, 
        likes: res.data
      }
    })

  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      }
    })
  }
}


// Delete post
export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${postId}`)
    dispatch({
      type: DELETE_POST,
      payload: postId
    })

    dispatch(setAlert('Post Deleted', 'success'))
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      }
    })
  }
}

// Add post
export const addPost = (formData) => async (dispatch) => {

  try {
    const res = await axios.post('/api/posts', formData)
    dispatch({
      type: ADD_POST,
      payload: res.data
    })

    dispatch(setAlert('Post Created', 'success'))
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      }
    })
  }
}



// Get post
export const getPost = (postId) => async (dispatch) => {

  try {
    const res = await axios.get( `/api/posts/${postId}`)
    dispatch({
      type: GET_POST,
      payload: res.data
    })

  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      }
    })
  }
}


// Add comment POST /api/posts/:postId/comments
export const addComment = (postId, formData) => async (dispatch) => {

  try {
    const res = await axios.post(`/api/posts/${postId}/comments`, formData)
    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    })

    dispatch(setAlert('Comment Created', 'success'))
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      }
    })
  }
}


// Delete comment DELETE /api/posts/:postId/comments/:commentId
export const deleteComment = (postId, commentId) => async (dispatch) => {

  try {
    await axios.delete(`/api/posts/${postId}/comments/${commentId}`)
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    })

    dispatch(setAlert('Comment Deleted', 'success'))
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      }
    })
  }
}
