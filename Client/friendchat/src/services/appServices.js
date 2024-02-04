import Socket from "./socket";
import http from "./httpServices";
const apiEndpoint = "http://localhost:4000/api";

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

  static fetchInterests = (categoryID, userToken) => {
    return http.post(
      `${apiEndpoint}/app/get-interests-by-category`,
      { categoryID },
      {
        headers: {
          "x-auth-token": userToken,
        },
      }
    );
  };

  static sendNotification = notification => {
    console.log("sending notif...")
    this.socket.volatile.emit("notification", notification)
  }

  static getNotification = callback => {
    this.socket.on("get_notification", notification => {
      callback(notification);
    })
  }
}

export default AppService;
