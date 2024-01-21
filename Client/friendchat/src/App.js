import "./App.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStoreState, useStoreActions, useStoreRehydrated } from "easy-peasy";
import Users from "./components/users/Users";
import Status from "./components/status/Status";
import Rooms from "./components/rooms/Rooms";
import UserService from "./services/userServices";
import NavBar from "./components/navBar/NavBar";

const navItems = [{ label: "Log Out", path: "/" }];

function App() {
  const navigate = useNavigate();
  const { username } = useParams();
  const isRehydrated = useStoreRehydrated();
  const user = useStoreState((state) => state.user);
  const rooms = useStoreState((state) => state.getRooms);
  const { addRoom, forwardMessage, setLogOut } = useStoreActions(
    (actions) => actions
  );
  const hasRoom = useStoreState((state) => state.hasRoom);
  const logOut = useStoreState((state) => state.logOut);

  const handleCheckPacket = (packet) => {
    const { sender, to: receiver } = packet;

    if (receiver === "#public")
      return forwardMessage({ key: receiver, msg: packet });

    if (sender === user.username) {
      if (hasRoom(receiver))
        return forwardMessage({ key: receiver, msg: packet });

      return addRoom({ key: receiver, roomId: receiver, msg: packet });
    }

    if (!hasRoom(sender)) {
      return addRoom({ key: sender, roomId: sender, msg: packet });
    } else forwardMessage({ key: sender, msg: packet });
  };

  useEffect(() => {
    addRoom({ key: "#public", roomId: "#public" });
  }, []);

  useEffect(() => {
    if (user && user.username === username) UserService.connectUser(user);
    else navigate("/login");

    return () => UserService.disconnect();
  }, []);

  if (!isRehydrated) return <div>Loading...in app</div>;
  // if (!user || logOut) return (
  //   <>
  //     <h1>
  //       Welcome to <span className="brand-name">FriendChat</span> !
  //     </h1>
  //     <Auth />
  //   </>
  // );*/

  return (
    <main className="h-screen w-screen bg-bgGradient">
      <NavBar navItems={navItems} />
      <div className="flex flex-row justify-center items-center h-full w-full pt-5">
        <div className="grid grid-cols-12 gap-2 w-[90%] h-[90%]">
          <div className="col-span-3 h-full overflow-hidden">
            <Status />
            <div className="w-full pt-2 h-[70%]">
              <div className="h-[10%] w-full border border-green rounded-t-xl"></div>
              <div className="border border-white h-[90%] w-[100%] rounded-b-xl p-3">
                <ul className="max-h-full overflow-y-scroll px-0">
                  <li>user 1</li>
                  <li>user 2</li>
                  <li>user 3</li>
                  <li>user 1</li>
                  <li>user 2</li>
                  <li>user 3</li>
                  <li>user 1</li>
                  <li>user 2</li>
                  <li>user 3</li>
                  <li>user 1</li>
                  <li>user 1</li>
                  <li>user 3</li>
                  <li>user 1</li>
                  <li>user 1</li>
                  <li>user 3</li>
                  <li>user 1</li>
                  <li>user 1</li>
                  <li>user 3</li>
                  <li>user 1</li>
                  <li>user 1</li>
                  <li>user 1</li>
                  <li>user 1</li>
                  <li>user 3</li>
                  <li>user 1</li>
                  <li>user 1</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-span-9 h-full ">
            <div className="border border-white h-full rounded-xl"></div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;

/* { sender: user.username,
     payload: {type: String,
               data: String},
     roomId: "#public" }*/

// abcd1234

{
  /* <>
      <Col sm={3}>
        <div className="side-bar rounded-top bg-light">
          <Profile />
          <Users />
        </div>
      </Col>
      <Col sm={9}>
        <div className="chat-section">
          <Rooms rooms={rooms} onCheckPacket={handleCheckPacket} />
        </div>
      </Col>
    </> */
}
