import io from "./server";
import onConnection from "./routes";

// middleware

// routes
io.on("connection", onConnection);
