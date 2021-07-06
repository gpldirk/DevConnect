const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')
const User = require('../../models/User')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


// @route POST /api/auth
// @desc Register User
// @access Public
router.post('/', [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password must have 6 or more charracters').isLength({ min: 6 }), 
  check('name', 'Name is required').not().isEmpty(),
], async (req, res) => {
  // check user input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    })
  }

  const { name, password, email } = req.body 

  try {
    // check if email has been taken
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({
        errors: [{
          msg: 'Email has been taken',
        }]
      })
    } 

    // create user model
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    })
    user = new User({
      name,
      email,
      password,
      avatar
    })

    // hash password using salt and save user into db
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    await user.save()

    // generate and return token
    const payload = {
      user: {
        id: user.id,
      }
    }
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => { // 1h
      if (err) {
        throw err
      } else {
        return res.json({
          token,
        })
      }
    }) 

  } catch (err) {
    console.error(err.message)
    return res.status(500).json({
      msg: 'server error'
    })

  }
})


module.exports = router