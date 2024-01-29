import "./App.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import { useStoreState, useStoreActions, useStoreRehydrated } from "easy-peasy";
import Status from "./components/status/Status";
import UserService from "./services/userServices";
import Tabs from "./components/tabs/Tabs";
import List from "./components/list/List";
import ConversationController from "./components/conversation/ConversationController";

function App() {
  const navigate = useNavigate();
  const [setNavItems] = useOutletContext();
  
  const isRehydrated = useStoreRehydrated();
  const { user, totalUnreadCount } = useStoreState((state) => state);

  const {
    addConversation,
    forwardMessage,
    setActiveConversation,
    handleLogOut,
  } = useStoreActions((actions) => actions);
  const getUser = useStoreState((state) => state.getUser);
  const hasConversation = useStoreState((state) => state.hasConversation);
  const [tab, setTab] = useState("users");
  const [searchVal, setSearchVal] = useState("");

  const handleCheckPacket = (packet) => {
    const { sender, to: receiver } = packet;

    if (receiver === "#public")
      return forwardMessage({ key: receiver, msg: packet });

    if (sender === user._id)
      return forwardMessage({ key: receiver, msg: packet });

    if (!hasConversation(sender)) {
      const other = getUser(sender);
      return addConversation({
        _id: sender,
        master: other.username,
        status: other.status,
        imgUrl: other.profile.imgUrl,
        message: packet,
      });
    } else forwardMessage({ key: sender, msg: packet });
  };

  useEffect(() => {
    addConversation({
      _id: "#public",
      master: "#public",
      status: "online",
      imgUrl: "/images/universe.png",
    });
    setActiveConversation("#public");
  }, []);

  useEffect(() => {
    const navItems = [
      { label: "My Profile", path: "profile/65b62b9e02b7f4a2dd71efc9" },
      {
        label: "Log Out",
        func: () => {
          handleLogOut();
          navigate("/login");
        },
      },
    ];

    setNavItems(navItems);
  }, []);

  if (!isRehydrated) return <div>Loading...in app</div>;

  return (
    <div className="grid grid-cols-12 gap-2 w-[90%] h-[90%]">
      <div className="col-span-3 h-full overflow-hidden">
        <Status />
        <div className="w-full pt-2 h-[70%]">
          <Tabs
            onSelectTab={setTab}
            selectedTab={tab}
            searchValue={searchVal}
            onSearch={setSearchVal}
            countBadge={totalUnreadCount}
          />
          <List selectedTab={tab} searchValue={searchVal} />
        </div>
      </div>
      <div className="col-span-9 h-full overflow-hidden">
        <div className="h-full overflow-hidden">
          <ConversationController onCheckPacket={handleCheckPacket} />
        </div>
      </div>
    </div>
  );
}

export default App;
