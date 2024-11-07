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

  socket.on("pre_offer", (data) => {
    const { callType, code } = data;
    const connectedPeer = connectedPeers.find((i) => i === code);
    if (connectedPeer) {
      const data = {
        callerSocketId: socket.id,
        callType,
      };
      io.to(code).emit("pre-offer", data);
    } else {
    }
  });

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
