import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";
import InterestSection from "./interestSection/InterestSection";
import UserInfoSection from "./userInfoSection/UserInfoSection";
import AboutSection from "./aboutSection/AboutSection";
import UserService from "../../services/userServices";
import "./profile.css";

const ProfileController = () => {
  const { userId } = useParams();
  const [setNavItems] = useOutletContext();
  const {
    handleLogOut,
    setUsername,
    setDescription,
    addUserInterest,
    setProfileImg,
  } = useStoreActions((actions) => actions);
  const { user, username, description, profileImg } = useStoreState((state) => state);
  const getCategoryById = useStoreState((state) => state.getCategoryById);
  const navigate = useNavigate();
  const [modifiable, setModifiable] = useState(false);
  const [toggleSetting, setToggleSetting] = useState(false);

  const extractProfile = (user) => {
    setUsername(user.username);
    setDescription(user.profile.description);
    setProfileImg(user.profile.imgUrl);

    user.profile.interests.forEach(i => {
      addUserInterest({ interest: i, category: i.category });
    })

  };

  useEffect(() => {
    const navItems = [
      { label: "Chat Room", path: "platform" },
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

  useEffect(() => {
    UserService.getUserProfile(extractProfile, userId);

    if (userId === user._id) setModifiable(true);
   
  }, [userId]);

  return (
    <div className="profile w-[90%] h-[90%] bg-white rounded-lg shadow-md overflow-hidden relative">
      <i
        className={`setting-icon fa-solid fa-gears text-3xl m-3 absolute right-0 ${
          !modifiable && "hidden"
        }`}
        onClick={() => setToggleSetting(!toggleSetting)}
      ></i>
      <div className="grid grid-rows-5 h-full w-full p-2">
        <div className="row-span-2 border-b-2 border-slate-200 grid grid-cols-4 gap-2">
          <UserInfoSection
            imgUrl={profileImg}
            username={username}
            toggleSetting={toggleSetting}
          />
          <AboutSection description={description} />
        </div>
        <div className="row-span-3 p-2 grid grid-rows-7">
          <div className="section-container row-span-1 flex flex-row justify-start items-center gap-3">
            <h3 className="3xl:text-4xl">Interests</h3>
            <i className="pen-icon fa-solid fa-pen-to-square text-md"></i>
          </div>

          <InterestSection
            modifiable={toggleSetting}
          />

          <div className="row-span-1 w-full flex flex-row justify-end items-center">
            <button className="secondary-btn text-xl">Say Hi 👋</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileController;