import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http"; // Needed for Socket.IO
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import roomRoutes from "./routes/roomroutes.js";
import routesai from "./routes/routesai.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/rooms", roomRoutes);
app.use('/api/ai',routesai);

// Error Middleware
app.use(notFound);
app.use(errorHandler);


// Create HTTP server for Socket.IO
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

// Socket.IO logic
const rooms = {};      // { roomId: [username1, username2] }
const codeInRoom = {}; // { roomId: currentCode }

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-room", ({ roomId, username }) => {
    socket.join(roomId);

    if (!rooms[roomId]) rooms[roomId] = [];
    rooms[roomId].push(username);

    // Send current code to new user
    if (codeInRoom[roomId]) socket.emit("code-update", codeInRoom[roomId]);

    // Update all users in room
    io.to(roomId).emit("update-users", rooms[roomId]);
  });

  socket.on("code-change", ({ roomId, code }) => {
    codeInRoom[roomId] = code;
    socket.to(roomId).emit("code-update", code);
  });

  socket.on("leave-room", ({ roomId, username }) => {
    socket.leave(roomId);
    if (rooms[roomId]) {
      rooms[roomId] = rooms[roomId].filter((u) => u !== username);
      io.to(roomId).emit("update-users", rooms[roomId]);
    }
  });

  socket.on("disconnect", () => console.log("User disconnected:", socket.id));
});

// Start server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
