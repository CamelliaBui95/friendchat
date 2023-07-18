import './profile.css';
import Dropdown from "react-bootstrap/Dropdown";
import {
  useStoreActions, useStoreState
} from 'easy-peasy';

const statuses = { online: "online", idle: "idle", busy: "busy" };

const Profile = () => {
  const { username, status: currentStatus } = useStoreState(state => state.user);
  const setUserStatus = useStoreActions(actions => actions.setUserStatus);
  
    return (
      <>
        <h2 className="text-dark">{username}</h2>
        <Dropdown>
          <Dropdown.Toggle
            className="bg-light text-dark border-0"
            id="dropdown"
            size="lg"
          >
            <i
              className={"fa fa-circle status " + currentStatus}
              aria-hidden="true"
            ></i>
            {currentStatus}
          </Dropdown.Toggle>

          <Dropdown.Menu>
                {Object.keys(statuses).map((status) => {
                  return status === currentStatus ? 
                                                  null
                                                  : (
                                                  <Dropdown.Item
                                                    value={status}
                                                    key={status}
                                                    onClick={() => setUserStatus(status)}
                                                  >
                                                    <i
                                                      className={"fa fa-circle status " + statuses[status]}
                                                      aria-hidden="true"
                                                    ></i>
                                                    {status}
                                                  </Dropdown.Item>
                                                  ); 
                })}
          </Dropdown.Menu>
        </Dropdown>
      </>
    );
}
 
export default Profile;