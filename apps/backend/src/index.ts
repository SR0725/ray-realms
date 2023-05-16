import { createServer } from "./server";
import { log } from "logger";

const port = process.env.BACKEND_PORT || 6000;
const server = createServer();

server.listen(port, () => {
  log(`api running on ${port}`);
});
