import app from "./src/index";
import env from "./src/configs/env";
import { connectDB } from "./src/configs/database";

connectDB()
  .then(() => {
    console.log("Database connected successfully !!!");
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
  });

app.listen(env.port, () => {
  console.log(`Server is running on port: ${env.port}`);
});
