import { io } from "socket.io-client";

const URL = `http://localhost:4000`;

class Socket {
  static socket; /**Singleton Pattern*/
  static handlers = [];
  static isConnected = false;

  static pollSocket = (authToken) => {
    this.socket = io(URL, {
      auth: {
        token: authToken,
      },
    });

    this.notify();
  };

  /**Observer Pattern */
  static addHandler = (handler) => {
    this.handlers[this.handlers.length++] = handler;
  };

  static notify() {
    for (let i = 0; i < this.handlers.length; i++) {
      this.handlers[i].update();
    }
  }

  static get = () => this.socket;

  static hasConnected = (callBack) => {
    this.socket.on("socket_connected", () => {
      callBack(true);
      this.isConnected = true;
    });
  };

  static getIsConnected = () => this.isConnected;
}

export default Socket;
