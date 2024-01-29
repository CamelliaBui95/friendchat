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
  const { handleLogOut } = useStoreActions((actions) => actions);
  const { user } = useStoreState((state) => state);
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  const extractProfile = user => {
    setProfile(user.profile);
  }

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
  }, [userId])

  return (
    <div className="profile w-[90%] h-[90%] bg-white rounded-lg shadow-md overflow-hidden">
      <div className="grid grid-rows-5 h-full w-full p-2">
        <div className="row-span-2 border-b-2 border-slate-200 grid grid-cols-4 gap-2">
          <UserInfoSection imgUrl={profile.imgUrl} username={user.username}/>
          <AboutSection description={profile.description}/>
        </div>
        <div className="row-span-3 p-2 grid grid-rows-7">
          <div className="section-container row-span-1 flex flex-row justify-start items-center gap-3">
            <h3 className="3xl:text-4xl">Interests</h3>
            <i class="pen-icon fa-solid fa-pen-to-square text-md"></i>
          </div>

          <InterestSection modifiable={true} userInterests={profile.interests}/>

          <div className="row-span-1 w-full flex flex-row justify-end items-center">
            <button className="secondary-btn text-xl">Say Hi 👋</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileController;
