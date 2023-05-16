import { Socket } from "socket.io";
import registerPlayerHandlers from "./playerRoute";

const onConnection = (socket: Socket) => {
  registerPlayerHandlers(socket);
};

export default onConnection;
