import { io } from 'socket.io-client';

// Kết nối tự động tới origin server hiện tại
export const socket = io({
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
});