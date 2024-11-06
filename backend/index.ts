import express, { Response, Request } from "express";

import { Server } from "socket.io";
import cors from "cors";
import http from "http";
const PORT = process.env.PORT || 3069;
const app = express();
app.use(cors());
const server = http.createServer(app);

let connectedPeers: string[] = [];

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  connectedPeers.push(socket.id);

  console.log(connectedPeers);

  socket.on("disconnect", () => {
    console.log("user disconnected");

    const newConnected = connectedPeers.filter((socketId: string) => {
      socketId !== socket.id;
    });

    connectedPeers = newConnected;
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("huehuheuheu");
});

server.listen(PORT, () => {
  console.log("listening on ", PORT);
});
