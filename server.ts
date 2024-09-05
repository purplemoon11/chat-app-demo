import { server } from "./src/index";
import env from "./src/configs/env";
import { connectDB } from "./src/configs/database";

// Connect to the database
connectDB()
  .then(() => {
    console.log("Database connected successfully !!!");
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
  });

// Start the server
server.listen(env.port, () => {
  console.log(`Server is running on port: ${env.port}`);
});
