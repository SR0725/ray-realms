import { z } from "zod";
export type Player = {
  id: string;
  name: string;
  position: [number, number, number];
  rotation: [number, number, number];
  playAnimation: string;
  dailySessionId: string | null;
};

export const playerSchema = z.object({
  id: z.string(),
  name: z.string(),
  position: z.array(z.number()),
  rotation: z.array(z.number()),
  playAnimation: z.nullable(z.string()),
});
