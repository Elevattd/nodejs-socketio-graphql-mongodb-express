const dotenv = require("dotenv");

dotenv.config();
const secret =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJuYW1lIjoibWFyaWFubyIsImVtYWlsIjoibWFyaWFub0Bhc2QuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkNTJoTHlZZEJPd2VsWVN0bUZ6c01BLmxILlFCYko0LlRVM1NjdXNtWnRyWldSWDRlTElWUkMiLCJ1cGRhdGVkQXQiOiIyMDIyLTA3LTEwVDIyOjAzOjU5LjM5NloiLCJjcmVhdGVkQXQiOiIyMDIyLTA3LTEwVDIyOjAzOjU5LjM5NloiLCJyZWZyZXNoVG9rZW4iOm51bGx9LCJpYXQiOjE2NTc0OTA2MzksImV4cCI6MTY1NzU3NzAzOX0.vI6NKhBETxRahUAumHeoXWDWhTkAnU0wtRqFr3bxYp8";
const config = {
  DB_URL: process.env.DB_PORT || "127.0.0.1",
  DB_PORT: process.env.DB_PORT || 27017,
  API_PORT: process.env.PORT || 4000,
  CORS: process.env.CORS || "http://localhost:3000/",
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || secret,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || secret,
  MONGODB_URI:
    process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/challengeSBS`,
};

module.exports = config;
