import React from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';

const UserInfoSection = ({toggleSetting}) => {
    const {profileImg, username} = useStoreState(state => state);
    const {setUsername, setProfileImg} = useStoreActions(actions => actions);

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("submit");
    };

    const handleClickIcon = (e) => {
      e.preventDefault();
      console.log("icon clicked");
    };

  return (
    <div className="col-span-1 flex flex-col justify-center items-center gap-3">
      <div className="section-container flex flex-row relative">
        <img src={profileImg} alt="" className="w-[150px] rounded-full" />
        <i
          className={`pen-icon fa-solid fa-pen-to-square text-md absolute right-0 bottom-0 ${!toggleSetting && "hidden"}`}
        ></i>
      </div>
      <div className="w-full">
        <form
          className="flex flex-row justify-center items-center h-full"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            type="text"
            className="profile-username-input font-semibold text-center text-2xl 3xl:text-3xl focus:outline-none"
            disabled={false}
            value={username}
            onChange={e => setUsername(e.target.value)}
          ></input>
        </form>
      </div>
    </div>
  );
}

export default UserInfoSection