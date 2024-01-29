import Socket from "./socket";

class AppService {
  static ioSocket = Socket;
  static socket;

  static update = () => {
    this.socket = this.ioSocket.get();
  };

  static getInterestCategories = (callback) => {
    this.socket.volatile.emit("get_categories");

    this.socket.on("get_categories", (categories) => {
      callback(categories);
    });
  };

    static getInterestsByCategory = (callback, categoryID) => {
    this.socket.volatile.emit("get_interests_by_category", categoryID);


    this.socket.on("get_interests_by_category", (interests) => {
        callback(interests);
    });
  };
}

export default AppService;
