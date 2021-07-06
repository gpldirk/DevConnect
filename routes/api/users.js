const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const { check, validationResult } = require('express-validator/check')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// @route POST /api/users
// @desc Login User
// @access Public
router.post('/', [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password must have 6 or more charracters').isLength({ min: 6 }), 
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    })
  }


  const {email, password} = req.body
  try {
    const user = await User.findOne({ email })
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password)

      if (isMatch) {
        const payload = {
          user: {
            id: user.id
          }
        }
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
          if (err) {
            throw err

          } else {
            return res.json({
              token,
            })
          }
        })

      } else {
        return res.status(400).json({
          msg: 'Wrong password'
        })
      }

    } else {
      return res.status(400).json({
        msg: 'Email has not been registered'
      })
    }

  } catch (err) {
    console.error(err.message)
    return res.status(500).json({
      msg: 'Server error'
    })
  }
})

// @route GET /api/users
// @desc Get User info
// @access Private
router.get('/', auth, async (req, res) => {
  const id = req.user.id
  if (id) {
    try {
      const user = await User.findById(id).select('-password')
      if (user) {
        return res.json(user)

      } else {
        return res.status(400).json({
          msg: 'User not found'
        })
      }

    } catch (err) {
      console.error(err.message)
      return res.status(500).json({
        msg: 'Server error'
      })
    }

  } else {
    return res.status(400).json({
      msg: 'Invalid Token'
    })
  }
})


module.exports = router