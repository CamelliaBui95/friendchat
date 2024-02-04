import "./App.css";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useStoreState, useStoreActions, useStoreRehydrated } from "easy-peasy";
import Status from "./components/status/Status";
import Tabs from "./components/tabs/Tabs";
import List from "./components/list/List";
import ConversationController from "./components/conversation/ConversationController";

function App() {
  const navigate = useNavigate();
  const [setNavItems, handleCheckPacket] = useOutletContext();
  
  const isRehydrated = useStoreRehydrated();
  const { user, totalUnreadCount, activeConversation, conversations } = useStoreState((state) => state);

  const {
    addConversation,
    setActiveConversation,
    handleLogOut,
  } = useStoreActions((actions) => actions);
  const [tab, setTab] = useState("users");
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    if (activeConversation === null) {
      if (!conversations.hasOwnProperty("#public")) {
        addConversation({
          _id: "#public",
          master: "#public",
          status: "online",
          imgUrl: "/images/universe.png",
        });
      }
      setActiveConversation("#public");
    }
      
    
  }, []);

  useEffect(() => {
    const navItems = [
      { label: "My Profile", path: `profile/${user._id}` },
      {
        label: "Log Out",
        func: () => {
          handleLogOut();
          navigate("/login");
        },
      },
    ];

    setNavItems(navItems);
  }, [user]);

  if (!isRehydrated) return <div>Loading...</div>;

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
