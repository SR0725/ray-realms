import io from "@/server";
import { Player } from "models";
import callOnInterval from "@utils/callOnInterval";
const PysicalIntervalTime = 1000 / 20;
const players = new Map<string, Player>();

const onUpdate = (players: Map<string, Player>) => {
  const playersList = Array.from(players).map((player) => player[1]);
  io.emit("player:update", playersList);
};

callOnInterval(onUpdate, players, PysicalIntervalTime);

const playerService = {
  join(newPlayer: Player) {
    players.set(newPlayer.id, newPlayer);
  },
  leave(playerId: string) {
    players.delete(playerId);
  },
  updateState(data: Player) {
    const player = players.get(data.id);
    if (!player) return;
    player.position = data.position;
    player.rotation = data.rotation;
    player.playAnimation = data.playAnimation;
  },
};

export default playerService;
