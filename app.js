const express = require("express");
const morgan = require('morgan')
const userRouter = require('./routes/userRoutes')
const companyRouter = require('./routes/companyRoutes')
const jobRouter = require('./routes/jobRoutes')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express();

app.use(cors({
    origin: true,
    credentials: true
}))

app.use(express.json())

app.use(morgan('dev'))

app.use(cookieParser())

app.use('/users', userRouter);

app.use('/companies', companyRouter);

app.use('/jobs', jobRouter);

module.exports = app;