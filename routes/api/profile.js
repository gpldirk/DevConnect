const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const Profile = require('../../models/Profile')
const Post = require('../../models/Post')
const { check, validationResult } = require('express-validator/check')
const request = require('request')


// @route GET /api/profile/me
// @desc Get currrent user profile
// @access Private
router.get('/me', auth, async (req, res) => {
  const id = req.user.id
  if (id) {
    try {
      const profile = await Profile.findOne({ user: id }).populate('user', ['name', 'avatar'])
      if (profile) {
        return res.json(profile)

      } else {
        return res.status(404).json({
          msg: 'Profile does not exist'
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
      msg: 'Invalid token'
    })
  }
})


// @route POST /api/profile
// @desc Create/Update user profile
// @access Private
router.post('/', auth, [
  check('status', 'Status is required').not().isEmpty(),
  check('skills', 'Skills is required').not().isEmpty(),
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    })
  }

  const {
    company,
    website,
    location,
    bio,
    status,
    github,
    skills,
    youtube,
    twitter,
    instagram,
    linkedin,
    facebook,
    // spread the rest of the fields we don't need to check
  } = req.body;

  const profileFields = {}
  profileFields.user = req.user.id
  if (company) profileFields.company = company
  if (website) profileFields.website = website
  if (location) profileFields.location = location
  if (bio) profileFields.bio = bio
  if (status) profileFields.status = status
  if (github) profileFields.github = github
  if (skills) {
    console.log(skills)
    profileFields.skills = skills.split(',').map(skill => skill.trim())
  }

  // Add social fields
  profileFields.social = {}
  if (youtube) profileFields.social.youtube = youtube
  if (twitter) profileFields.social.twitter = twitter
  if (instagram) profileFields.social.instagram = instagram
  if (linkedin) profileFields.social.youtube = linkedin
  if (facebook) profileFields.social.facebook = facebook

  try {
    let profile = await Profile.findOne({ user: req.user.id })
    if (profile) {
      // update profile
      profile = await Profile.findByIdAndUpdate(
        profile.id, 
        { $set: profileFields },
        { new: true },
      )

    } else {
      // Create profile
      profile = new Profile(profileFields)
      await profile.save()
    }

    return res.json(profile)
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({
      msg: 'Server error'
    })
  }
})


// @route GET /api/profile
// @desc Get all profiles
// @access Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar'])
    return res.json(profiles)

  } catch (err) {
    console.error(err.message)
    return res.status(500).json({
      msg: 'Server error'
    })
  }
})


// @route GET /api/profile/:userId
// @desc Get profile by userId
// @access Public
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId

  try {
    const profile = await Profile.findOne({ user: userId }).populate('user', ['name', 'avatar'])
    if (profile) {
      return res.json(profile)
    } else {
      return res.status(404).json({
        msg: "No profile for this user"
      })
    }

  } catch (err) {
    console.error(err.message)
    if (err.kind == 'ObjectId') {
      return res.status(400).json({
        msg: "No profile for this user"
      })
    }

    return res.status(500).json({
      msg: "Server error"
    })
  }
})


// @route DELETE /api/profile
// @desc Delete profile, user && posts
// @access Private
router.delete('/', auth, async (req, res) => {
  try {
    // remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    
    // remove posts
    await Post.deleteMany({ user: req.user.id })

    // remove user
    await User.findOneAndRemove({ _id: req.user.id });
    return res.json({
      msg: "User Deleted"
    })

  } catch (err) {
    console.error(err.message)
    return res.status(500).json({
      msg: "Server error"
    })
  }
})


// @route PUT /api/profile/experience
// @desc Add profile experience
// @access Private
router.put('/experience', auth, [
  check('title', 'Title is required').not().isEmpty(),
  check('company', 'Company is required').not().isEmpty(),
  check('from', 'From date is required').not().isEmpty(),
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    })
  }

  const {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  } = req.body

  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  }

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    profile.experience.unshift(newExp) // add newExp on the first experience
    await profile.save()
    return res.json(profile)

  } catch (err) {
    console.error(err.message)
    return res.status(500).json({
      msg: "Server error"
    })
  }
})


// @route DELETE /api/profile/experience/:expId
// @desc Delete profile experience
// @access Private
router.delete('/experience/:expId', auth, async (req, res) => {
  const expId = req.params.expId
  try {
    const profile = await Profile.findOne({ user: req.user.id })
    // Get remove index
    const index = profile.experience.map(e => e.id).indexOf(expId)
    profile.experience.splice(index, 1)

    await profile.save()
    return res.json(profile)

  } catch (err) {
    console.error(err.message)
    return res.status(500).json({
      msg: "Server error"
    })
  }
})

// @route PUT /api/profile/education
// @desc Add profile education
// @access Private
router.put('/education', auth, [
  check('school', 'School is required').not().isEmpty(),
  check('degree', 'Degree is required').not().isEmpty(),
  check('field', 'Field is required').not().isEmpty(),
  check('from', 'From date is required').not().isEmpty(),
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    })
  }

  const {
    school,
    degree,
    field,
    from,
    to,
    current,
    description,
  } = req.body

  const newEdu = {
    school,
    degree,
    field,
    from,
    to,
    current,
    description,
  }

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    profile.education.unshift(newEdu) // add newExp on the first experience
    await profile.save()
    return res.json(profile)

  } catch (err) {
    console.error(err.message)
    return res.status(500).json({
      msg: "Server error"
    })
  }
})


// @route DELETE /api/profile/education/:eduId
// @desc Delete profile education
// @access Private
router.delete('/education/:eduId', auth, async (req, res) => {
  const eduId = req.params.eduId
  try {
    const profile = await Profile.findOne({ user: req.user.id })
    // Get remove index
    const index = profile.education.map(e => e.id).indexOf(eduId)
    profile.education.splice(index, 1)

    await profile.save()
    return res.json(profile)
    
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({
      msg: "Server error"
    })
  }
})


// @route GET /api/profile/github/:username
// @desc Get user repos from Github
// @access Public
router.get('/github/:username', async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    }

    request(options, (err, response, body) => {
      if (err) {
        console.err(err.message)
      }

      if (response.statusCode !== 200) {
        return res.status(404).json({
          msg: 'No Github profile found'
        })
      }

      return res.json(JSON.parse(body))
    })
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({
      msg: "Server error"
    })
  }
})


module.exports = router