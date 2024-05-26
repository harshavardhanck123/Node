
require('dotenv').config();

const URI = process.env.URI;
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
    URI,
    JWT_SECRET
};