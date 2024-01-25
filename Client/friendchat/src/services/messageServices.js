import Socket from './socket';

class MessageService {
  static ioSocket = Socket;
  static socket;
  
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

  static getNotification = callback => {
    this.socket.on("get_notified", notification => {
      callback(notification);
    })
  }
}

export default MessageService;

