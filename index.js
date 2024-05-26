const app = require('./app')

const mongoose = require('mongoose')


console.log("connecting to mongodb..")

const config = require('./utils/config')

mongoose.connect(config.URI)
  .then(() => {
    console.log("Connected to MongoDB")

    app.listen(3001, () => {
      console.log("Server is running on http://127.0.0.1:3001");
    });
  }
  )
  .catch((e) => {
    console.log("Error connecting to MongoDB", e.message);
  })
