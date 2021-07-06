require('dotenv').config({
  path: './config/config.env'
})

const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')


// Connect to MongoDB
const connectDB = require('./config/db')
connectDB()

// Init middleware
app.use(express.json({ extended: false }))
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Add routes
const authRoutes = require('./routes/api/auth')
const profileRoutes = require('./routes/api/profile')
const usersRoutes = require('./routes/api/users')
const postsRoutes = require('./routes/api/posts')

app.use('/api/auth', authRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/posts', postsRoutes)


// under routes, serve static folder
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}


// Start running and listen on port
const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})
