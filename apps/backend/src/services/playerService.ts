import io from "@/server";
import { Player } from "models";
import callOnInterval from "@utils/callOnInterval";
const PysicalIntervalTime = 1000 / 20;
const players = new Map<string, Player>();

const onUpdate = (player: Map<string, Player>) => {
  console.log("player", player);
  io.emit("player:update", player);
};

callOnInterval(onUpdate, players, PysicalIntervalTime);

const playerService = {
  join(newPlayer: Player) {
    players.set(newPlayer.id, newPlayer);
  },
  leave(playerId: string) {
    players.delete(playerId);
  },
  setTransform(
    playerId: string,
    position: [number, number, number],
    rotation: [number, number, number]
  ) {
    const player = players.get(playerId);
    if (!player) return;
    player.position = position;
    player.rotation = rotation;
  },
};

export default playerService;
