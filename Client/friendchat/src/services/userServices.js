import Socket from './socket';
import http from "./httpServices";

const apiEndpoint = "http://localhost:4000/api";

class UserService {
  static ioSocket = Socket;
  static socket;

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

  static loginUser = (userData, registerToken) => {
    return http.post(`${apiEndpoint}/auth`, userData, {
      headers: {
        "x-auth-token": registerToken,
      },
    });
  };

  static getAllUsernames = () => {
    return http.get(`${apiEndpoint}/user/all`);
  }

  static connectUser = (user) => {
    this.socket.volatile.emit("user_login", user);
  };

  static disconnect = () => {
    if (this.ioSocket.getIsConnected()) this.socket.disconnect();
  };

  static getAllUsers = (setAllUsers) => {
    this.socket.on("all_users", (users) => {
      setAllUsers(users);
    });
  };

  static updateUserStatus = (status) => {
    this.socket.emit("update_status", status);
  };
}

export default UserService;
