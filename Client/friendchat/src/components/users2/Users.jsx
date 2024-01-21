
import "./users.css";
import { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import UserService from '../../services/userServices';

const Users = () => {
  const { allUsers: users } = useStoreState(state => state);
  const hasRoom = useStoreState(state => state.hasRoom);
  const { setAllUsers, addRoom, setActiveRoom } = useStoreActions(actions => actions);

  const handleSelectUser = user => {
    if (hasRoom(user.username)) {
      setActiveRoom(user.username);
      return;
    }
    addRoom({ key: user.username, roomId: user.username });   
  }

  useEffect(() => {
    UserService.getAllUsers(setAllUsers);
    
  }, [users]);

  return (
    <ul className="users scroll rounded-top bg-white">
      {users.map((user, index) => (
        <li key={index} onClick={() => handleSelectUser(user)}>
          <i
            className={"fa fa-circle status " + user.status}
            aria-hidden="true"
          ></i>
          {user.username}
        </li>
      ))}
    </ul>
  );
};

export default Users;

// user = {username: String, id: number, status: String};
