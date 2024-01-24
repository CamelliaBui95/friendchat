import "./App.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStoreState, useStoreActions, useStoreRehydrated } from "easy-peasy";
import Status from "./components/status/Status";
import Rooms from "./components/rooms/Rooms";
import UserService from "./services/userServices";
import NavBar from "./components/navBar/NavBar";
import Tabs from "./components/tabs/Tabs";
import List from "./components/list/List";
import ConversationController from "./components/conversation/ConversationController";

const navItems = [
  { label: "My Profile", path: "/my-profile" },
  { label: "Log Out", path: "/" },
];

function App() {
  const navigate = useNavigate();
  const { username } = useParams();
  const isRehydrated = useStoreRehydrated();
  const { user } = useStoreState((state) => state);

  const { addConversation, forwardMessage } = useStoreActions(
    (actions) => actions
  );
  const getUser = useStoreState((state) => state.getUser);
  const hasConversation = useStoreState((state) => state.hasConversation);
  const [tab, setTab] = useState("users");
  const [searchVal, setSearchVal] = useState("");

  const handleCheckPacket = (packet) => {
    const { sender, to: receiver } = packet;

    if (receiver === "#public")
      return forwardMessage({ key: receiver, msg: packet });

    if (sender === user._id) {
      /*if (hasConversation(receiver))
        return forwardMessage({ key: receiver, msg: packet });

      const other = getUser(receiver);
      return addConversation({ 

       });*/
      return forwardMessage({ key: receiver, msg: packet });
    }

    if (!hasConversation(sender)) {
      const other = getUser(sender);
      return addConversation({
        _id: sender,
        master: other.username,
        status: other.status,
        imgUrl: other.imgUrl,
        message: packet,
      });
    }
    else forwardMessage({ key: sender, msg: packet });
  };

  useEffect(() => {
    addConversation({
      _id: "#public",
      master: "#public",
      status: "online",
      imgUrl: "../images/cat-user.png",
    });
  }, []);

  useEffect(() => {
    if (user && user.username === username) UserService.connectUser(user);
    else navigate("/login");

    //return () => UserService.disconnect();
  }, []);

  if (!isRehydrated) return <div>Loading...in app</div>;

  return (
    <main className="h-screen w-screen bg-bgGradient">
      <NavBar navItems={navItems} />
      <div className="flex flex-row justify-center items-center h-full w-full pt-5">
        <div className="grid grid-cols-12 gap-2 w-[90%] h-[90%]">
          <div className="col-span-3 h-full overflow-hidden">
            <Status />
            <div className="w-full pt-2 h-[70%]">
              <Tabs
                onSelectTab={setTab}
                selectedTab={tab}
                searchValue={searchVal}
                onSearch={setSearchVal}
              />
              <List selectedTab={tab} searchValue={searchVal} />
            </div>
          </div>
          <div className="col-span-9 h-full ">
            <div className="h-full">
              <ConversationController onCheckPacket={handleCheckPacket}/>
            </div>
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

// {
// const handleCheckPacket = (packet) => {
//   const { sender, to: receiver } = packet;

//   if (receiver === "#public")
//     return forwardMessage({ key: receiver, msg: packet });

//   if (sender === user.username) {
//     if (hasRoom(receiver))
//       return forwardMessage({ key: receiver, msg: packet });

//     return addRoom({ key: receiver, roomId: receiver, msg: packet });
//   }

//   if (!hasRoom(sender)) {
//     return addRoom({ key: sender, roomId: sender, msg: packet });
//   } else forwardMessage({ key: sender, msg: packet });
// };
// }
