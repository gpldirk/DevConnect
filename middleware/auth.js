const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  // Get token from header
  const token = req.get('x-auth-token')
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = decoded.user
      next()

    } catch (err) {
      console.error(err.message)
      return res.status(401).json({
        msg: "Invalid Token"
      })
    }
    
  } else {
    return res.status(401).json({
      msg: "No token, auth failed"
    })
  }
}