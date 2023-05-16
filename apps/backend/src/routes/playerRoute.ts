import { Socket } from "socket.io";
import playerService from "@services/playerService";
import { Player, playerSchema } from "models";
import isValid from "@/utils/isValid";

const playerJoin = (socket: Socket, data: Player) => {
  playerService.join(data);
};

const registerPlayerHandlers = (socket: Socket) => {
  socket.on("player:join", (data) => {
    if (!isValid(data, playerSchema)) {
      socket.emit("error", `Invalid data format for player:join`);
    } else {
      playerJoin(socket, data);
    }
  });

  socket.on("disconnect", () => {
    playerService.leave(socket.id);
  });
};

export default registerPlayerHandlers;
