// src/utils/api.js
import axios from "axios";
const API_URL = "http://localhost:5000/api/rooms";

export const getRooms = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createRoom = async (roomId, username) => {
  const res = await axios.post(`${API_URL}/create`, { roomId, username });
  return res.data;
};

export const joinRoom = async (roomId, username) => {
  const res = await axios.post(`${API_URL}/join`, { roomId, username });
  return res.data;
};
