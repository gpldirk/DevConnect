const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, { // return Promise
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    console.log(`MongoDB Connected: ${connection.connection.host}`)

  } catch (err) {
    console.error('MongoDB Connection Failed: ', err.message)
    process.exit(1)
  }
}

module.exports = connectDB


