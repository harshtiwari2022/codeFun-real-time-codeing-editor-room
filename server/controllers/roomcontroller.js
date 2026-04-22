import Room from "../models/room.js";

// @desc    Create new room
// @route   POST /api/rooms/create
export const createRoom = async (req, res) => {
  try {
    const { roomId, username } = req.body;

    let room = await Room.findOne({ roomId });
    if (room) return res.status(400).json({ message: "Room already exists" });

    room = new Room({
      roomId,
      createdBy: username,
      users: [{ username }],
    });

    await room.save();
    res.status(201).json(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const joinRoom = async (req, res) => {
  try {
    const { roomId, username } = req.body;

    const room = await Room.findOne({ roomId });
    if (!room) return res.status(404).json({ message: "Room not found" });

    const alreadyJoined = room.users.find((u) => u.username === username);
    if (!alreadyJoined) {
      room.users.push({ username });
      await room.save();
    }

    res.json(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Leave a room
// @route   POST /api/rooms/leave
export const leaveRoom = async (req, res) => {
  try {
    const { roomId, username } = req.body;

    const room = await Room.findOne({ roomId });
    if (!room) return res.status(404).json({ message: "Room not found" });

    room.users = room.users.filter((u) => u.username !== username);
    await room.save();

    res.json({ message: "User left the room", room });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get all rooms
// @route   GET /api/rooms
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
