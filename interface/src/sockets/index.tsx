import { Socket, io } from "socket.io-client";

export class socketHolder {
  socket: Socket | null = null;

  constructor(url: string) {
    this.socket = io(url, {
      autoConnect: false,
    });
  }

  connect() {
    if (this.socket) {
      this.socket.connect();
      console.log("Connected to WebSocket server");
    } else {
      console.error("Socket is not initialized");
    }
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
