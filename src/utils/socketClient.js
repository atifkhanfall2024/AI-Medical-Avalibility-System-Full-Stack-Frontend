import { io } from "socket.io-client";
import Backend_URL from "./constant";


export const SocketClient = () => {
  return io(Backend_URL);
};