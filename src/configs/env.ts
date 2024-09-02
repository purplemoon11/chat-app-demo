import dotenv from "dotenv";

dotenv.config();

export default {
  // app
  port: process.env.PORT,

  // database
  dbName: process.env.MONGO_URI,

  // secrets
  jwtTokenSecret: process.env.JWT_TOKEN_SECRET,

  //swagger
  swaggerDev: process.env.DEV_SWAGGER_URI,
};
