import Socket from './socket';
import http from "./httpServices";

const apiEndpoint = "http://localhost:4000/api";

class UserService {
  static ioSocket = Socket;
  static socket;
  static isConnected = false;

  /**Observer Pattern */
  static update = () => {
    this.socket = this.ioSocket.get();
  };

  static registerUser = (userData) => {
    return http.post(`${apiEndpoint}/user/register`, userData);
  };

  static getUserToken = (userData) => {
    return http.post(`${apiEndpoint}/user/getUserToken`, userData);
  }

  static loginUser = (userData, userToken) => {
    return http.post(`${apiEndpoint}/auth`, userData, {
      headers: {
        "x-auth-token": userToken,
      },
    });
  };

  static getAllUsernames = () => {
    return http.get(`${apiEndpoint}/user/all`);
  }

  static connectUser = (user) => {
    if (this.socket) {
      this.socket.volatile.emit("user_login", user);
      this.isConnected = true;
    }
  };

  static disconnect = () => {
    sessionStorage.removeItem("userToken");
    sessionStorage.removeItem("authToken");

    if (this.socket) {
      console.log("disconnecting...");
      this.socket.disconnect();
      this.isConnected = false;
    }  
  };

  static getAllUsers = (setAllUsers) => {
    this.socket.on("all_users", (users) => {
      setAllUsers(users);
    });
  };

  static updateUserStatus = (status) => {
    this.socket.emit("update_status", status);
  };

  static updateUserList = (setUpdateUsers) => {
    this.socket.on("update_user_list", (updatedUser) => {
      setUpdateUsers(updatedUser);
    })
  }
}

export default UserService;
