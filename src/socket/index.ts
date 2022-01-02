import { io } from "socket.io-client";

export const editor = io(`${process.env.SOCKET_ENDPOINT}/editor`, {
  withCredentials: true,
});