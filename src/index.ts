import express, { Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import v1Route from "./routes/index";
import AppError from "./utils/appError";
import setupSwagger from "./configs/swagger";
import { MessageModel } from "./models/message.model";
import { User } from "./models/user.model";

// Initialize Express app
const app = express();

// Create HTTP server and integrate with Socket.io
const server = createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
  },
});

// Swagger setup
setupSwagger(app);

// Express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Routes
app.use("/api/v1", v1Route);

// Handle invalid routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(404, `Route ${req.originalUrl} not found`));
});

// Global error handler
app.use((error: AppError, req: Request, res: Response, next: NextFunction) => {
  res.status(error?.statusCode || 500).json({
    status: error?.status || "error",
    statusCode: error?.statusCode,
    message: error?.message || "Internal Server Error",
  });
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("sendMessage", async (messageData) => {
    try {
      // Ensure messageData contains senderId and content
      if (!messageData.senderId || !messageData.content) {
        throw new Error("Sender ID and message content are required.");
      }

      // Create the message
      const message = new MessageModel({
        sender: messageData.senderId,
        content: messageData.content,
      });

      // Save message to the database
      const savedMessage = await message.save();

      // Populate the sender field with user data
      const populatedMessage = await MessageModel.findById(
        savedMessage._id
      ).populate("sender", "fullName _id");

      io.emit("message", populatedMessage);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Handle uncaught exceptions and rejections
process
  .on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at Promise", reason, promise);
  })
  .on("uncaughtException", (err) => {
    console.error("Uncaught Exception thrown", err);
    process.exit(1);
  });

// Export the app and server for use in other modules or for testing
export { app, server };
