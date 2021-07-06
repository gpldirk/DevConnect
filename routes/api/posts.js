const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const Post = require('../../models/Post')
const Profile = require('../../models/Profile')

// @route POST /api/posts
// @desc Create a new post
// @access Private
router.post('/', auth, [
  check('text', 'Text is required').not().isEmpty(),
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    })
  }

  try {
  
    const user = await User.findById(req.user.id).select('-password')
    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    })

    const post = await newPost.save()
    return res.json(post)

  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server error')
  }
})


// @route GET /api/posts
// @desc Get all posts
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 }) // most recent first
    return res.json(posts)

  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server error')
  }
})

// @route GET /api/posts/:postId
// @desc Get one post by its id
// @access Private
router.get('/:postId', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
    if (post) {
      return res.json(post)
    } else {
      return res.status(400).json({
        msg: 'Post not found'
      })
    }
    
  } catch (err) {
    console.error(err.message)
    if (err.kind === 'ObjectId') {  // invalid id
      return res.status(400).json({
        msg: 'Post not found'
      })

    } else {
      return res.status(500).send('Server error') // internal server error
    }
  }
})

// @route DELETE /api/posts/:postId
// @desc Delete one post by its id
// @access Private
router.delete('/:postId', auth, async (req, res) => {

  try {
    await Post.findOneAndRemove({ user: req.user.id, _id: req.params.postId }) 
    return res.json({
      msg: 'Post Deleted'
    })

  } catch (err) {
    console.error(err.message)
    if (err.kind === 'ObjectId') {  // invalid id
      return res.status(400).json({
        msg: 'Post not found'
      })

    } else {
      return res.status(500).send('Server error') // internal server error
    }
  }
})

// @route PUT /api/posts/like/:postId
// @desc Update one post likes array
// @access Private
router.put('/like/:postId', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
    if (post) {
      // check if current user likes this post
      if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
        return res.status(400).json({
          msg: 'Already liked this post'
        })

      } else {
        post.likes.unshift({ user: req.user.id })
        await post.save()
        return res.json(post.likes)
      }

    } else {
      return res.status(404).json({
        msg: 'Post not found'
      })
    }
  } catch (err) {
    console.error(err.message)
    if (err.kind === 'ObjectId') {  // invalid id
      return res.status(400).json({
        msg: 'Post not found'
      })

    } else {
      return res.status(500).send('Server error') // internal server error
    }
  }
})



// @route PUT /api/posts/unlike/:postId
// @desc Update one post likes array
// @access Private
router.put('/unlike/:postId', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
    if (post) {
      // check if current user likes this post
      if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
        return res.status(400).json({
          msg: 'Post has not been liked yet'
        })

      } else {
        // Get the remove index
        const index = post.likes.map(like => like.user.toString()).indexOf(req.user.id)
        post.likes.splice(index, 1) // ???
        await post.save()
        return res.json(post.likes)
      }

    } else {
      return res.status(404).json({
        msg: 'Post not found'
      })
    }
  } catch (err) {
    console.error(err.message)
    if (err.kind === 'ObjectId') {  // invalid id
      return res.status(400).json({
        msg: 'Post not found'
      })

    } else {
      return res.status(500).send('Server error') // internal server error
    }
  }
})


// @route POST /api/posts/:postId/comments
// @desc Create a new comment on one post
// @access Private
router.post('/:postId/comments', auth, [
  check('text', 'Text is required').not().isEmpty(),
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    })
  }

  try { 
    const user = await User.findById(req.user.id).select('-password')
    const post = await Post.findById(req.params.postId)
    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    }

    post.comments.unshift(newComment)
    await post.save()
    return res.json(post.comments)

  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server error')
  }
})


// @route DELETE /api/posts/:postId/comments/:commentId
// @desc Delete a comment on one post
// @access Private
router.delete('/:postId/comments/:commentId', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
    // Get comment on this post
    const comment = post.comments.find(comment => comment.id === req.params.commentId)
    if (comment) {
      if (comment.user.toString() === req.user.id) {
        const index = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id)
        post.comments.splice(index, 1) // ???
        await post.save()
        return res.json(post.comments)

      } else {
        return res.status(401).json({
          msg: 'User not authorized'
        })
      }
    } else {
      return res.status(404).json({
        msg: 'Comment not found'
      })
    }

  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server error')
  }
})


module.exports = router