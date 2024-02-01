import React, { useState, useEffect, useRef } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";

const UserInfoSection = ({ toggleSetting, user }) => {
  const inputRef = useRef(null);
  const { profileImg, username, allUsernames } = useStoreState(
    (state) => state
  );
  const { setUsername, setProfileImg } = useStoreActions((actions) => actions);
  const [input, setInput] = useState("");
  const [errorHidden, setErrorHidden] = useState(true);

  const handleOnChange = ({ value }) => {
    setInput(value);
    setUsername(value);
  };

  const isUsernameAvailable = (username) => {
    const predicate1 = user.username === username;
    const predicate2 =
      allUsernames.find((u) => u.username === username) === undefined;

    return predicate1 || predicate2;
  };

  useEffect(() => {
    setInput(username);
  }, [username]);

  useEffect(() => {
    if(inputRef.current)
      if(toggleSetting)
        inputRef.current.focus();
  }, [toggleSetting])

  return (
    <div className="col-span-1 flex flex-col justify-center items-center gap-3">
      <div className="section-container flex flex-row relative">
        <img src={profileImg} alt="" className="w-[150px] rounded-full" />
        <i
          className={`pen-icon fa-solid fa-pen-to-square text-md absolute right-0 bottom-0 ${
            !toggleSetting && "hidden"
          }`}
        ></i>
      </div>
      <div className="w-full">
        <div className="flex flex-row justify-center items-center h-full">
          <input
            type="text"
            className="profile-username-input font-semibold text-center text-2xl 3xl:text-3xl focus:outline-none rounded-xl focus:underline"
            disabled={!toggleSetting}
            value={input}
            onChange={(e) => handleOnChange(e)}
            ref={inputRef}
          ></input>
        </div>
        <p className="text-center m-0 text-red-500" hidden={errorHidden}>
          Username is not available.
        </p>
      </div>
    </div>
  );
};

export default UserInfoSection;
