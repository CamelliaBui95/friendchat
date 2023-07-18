import Socket from './socket';

class MessageService {
  static ioSocket = Socket;
  static socket;
  
  /**Observer Pattern */
  static update = () => {
    this.socket = this.ioSocket.get();
  };

  static sendMessage = msg => {
    this.socket.volatile.emit("chat_message", msg);
  }

  static getMessage = callback => {
    this.socket.on("chat_message", msg => {
        callback(msg);
    })
  }
}

export default MessageService;

