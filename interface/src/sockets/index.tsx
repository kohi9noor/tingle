import { useRootContext } from "@/context/root.context";
import { Socket, io } from "socket.io-client";

export class socketHolder {
  socket: Socket | null = null;

  constructor(url: string) {
    this.socket = io(url, {
      autoConnect: false,
    });
  }

  connect() {
    return new Promise((resolve, reject) => {
      if (this.socket) {
        this.socket.connect();

        this.socket.on("connect", () => {
          console.log("Connected with socket ID:", this.socket?.id);
          resolve(this.socket?.id);
        });

        this.socket.on("connect_error", (error) => {
          console.error("Connection error:", error);
          reject(error);
        });
      } else {
        console.error("Socket is not initialized");
        reject(new Error("Socket is not initialized"));
      }
    });
  }

  emit(event: string, data: any) {
    if (this.socket) {
      this.socket.emit(event, data);
      console.log("Emitted event:", event, data);
    } else {
      console.error("Socket is not initialized");
    }
  }

  on(event: string, callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on(event, callback);
    } else {
      console.error("Socket is not initialized");
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      console.log("Disconnected from WebSocket server");
    } else {
      console.error("Socket is not initialized");
    }
  }
}
