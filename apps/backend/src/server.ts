import { Server } from "socket.io";
import { createServer } from "http";
import { log } from "logger";

const port = Number(process.env.BACKEND_PORT) || 6000;

const httpServer = createServer();

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
const io = new Server(httpServer, {
  cors: {
    origin: frontendUrl,
  },
});

httpServer.listen(port, () => {
  log(`Listening to port ${port}`);
});
export default io;
