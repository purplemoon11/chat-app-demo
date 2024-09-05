import express, { Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import v1Route from "./routes/index";
import AppError from "./utils/appError";
import setupSwagger from "./configs/swagger";

const app = express();
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
app.use(express.urlencoded({ extended: false }));

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

// Handle Socket.io connections
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("sendMessage", (messageData) => {
    io.emit("message", messageData);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Handle uncaught exceptions and rejections
process
  .on("unhandledRejection", (reason, promise) => {
    console.error(reason, "Unhandled Rejection at Promise", promise);
  })
  .on("uncaughtException", (err) => {
    console.error(err, "Uncaught Exception thrown");
    process.exit(1);
  });

export { app, server };
