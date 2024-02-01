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
    updateProfile,
  } = useStoreActions((actions) => actions);
  const { user } = useStoreState((state) => state);
  const navigate = useNavigate();
  const [modifiable, setModifiable] = useState(false);
  const [toggleSetting, setToggleSetting] = useState(false);

  const extractProfile = (currentUser) => {

    if(currentUser === null) {
      navigate(`/app/${user.username}/platform`)
    } else {
      setUsername(currentUser.username);
      setDescription(currentUser.profile.description);
      setProfileImg(currentUser.profile.imgUrl);
  
      currentUser.profile.interests.forEach((i) => {
        addUserInterest({ interest: i, categoryId: i.category });
      });
    }
   
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
          <UserInfoSection toggleSetting={toggleSetting} user={user} />
          <AboutSection toggleSetting={toggleSetting && modifiable} />
        </div>
        <div className="row-span-3 p-2 grid grid-rows-7">
          <h3 className="3xl:text-4xl">Interests</h3>

          <InterestSection modifiable={toggleSetting} />

          <div className="row-span-1 w-full flex flex-row justify-end items-center">
            {!modifiable ? (
              <button className="secondary-btn text-xl">Say Hi 👋</button>
            ) : (
              toggleSetting && (
                <button
                  className="secondary-btn text-xl"
                  onClick={(e) => {
                    e.preventDefault();
                    updateProfile();
                    setToggleSetting(false);
                  }}
                >
                  Save Changes
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileController;
