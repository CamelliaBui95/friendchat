import React, { useState, useEffect, useRef } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import "./userInfoSection.css";

const profileImgs = [
  { id: 1, imgUrl: "/images/cat-user.png" },
  { id: 2, imgUrl: "/images/cat-user-2.png" },
  { id: 3, imgUrl: "/images/cat-user-3.png" },
  { id: 4, imgUrl: "/images/cat-user-4.png" },
  { id: 5, imgUrl: "/images/cat-user-5.png" },
  { id: 6, imgUrl: "/images/cat-user-6.png" },
  { id: 7, imgUrl: "/images/dog-user-1.png" },
  { id: 8, imgUrl: "/images/dog-user-2.png" },
  { id: 9, imgUrl: "/images/dog-user-3.png" },
  { id: 10, imgUrl: "/images/dog-user-4.png" },
  { id: 11, imgUrl: "/images/dog-user-5.png" },
  { id: 12, imgUrl: "/images/dog-user-6.png" },
  { id: 13, imgUrl: "/images/dinosaur-user-1.png" },
  { id: 14, imgUrl: "/images/dinosaur-user-2.png" },
  { id: 15, imgUrl: "/images/dinosaur-user-3.png" },
  { id: 16, imgUrl: "/images/fish-user-1.png" },
  { id: 17, imgUrl: "/images/fish-user-2.png" },
  { id: 18, imgUrl: "/images/fish-user-3.png" },
  { id: 19, imgUrl: "/images/fish-user-4.png" },
];

const UserInfoSection = ({ toggleSetting, user }) => {
  const inputRef = useRef(null);
  const { profileImg, username, allUsernames } = useStoreState(
    (state) => state
  );
  const { setUsername, setProfileImg, fetchAllUsernames } = useStoreActions(
    (actions) => actions
  );
  const [input, setInput] = useState("");
  const [errorHidden, setErrorHidden] = useState(true);
  const [hideImgSelection, setHideImgSelection] = useState(true);

  const handleOnChange = (e) => {
    setInput(e.target.value);

    if (isUsernameAvailable(e.target.value)) {
      setUsername(e.target.value);
      setErrorHidden(true);
    } else setErrorHidden(false);
  };

  const isUsernameAvailable = (username) => {
    const predicate1 = user.username === username;
    const predicate2 =
      allUsernames.find((u) => u.username === username) === undefined;

    return predicate1 || predicate2;
  };

  useEffect(() => {
    if (allUsernames.length === 0) fetchAllUsernames();
  }, []);

  useEffect(() => {
    setInput(username);
  }, [username]);

  useEffect(() => {
    if (inputRef.current) if (toggleSetting) inputRef.current.focus();

    if (!toggleSetting) setHideImgSelection(true);
  }, [toggleSetting]);

  return (
    <div className="col-span-1 flex flex-col justify-center items-center gap-3">
      <div className="section-container flex flex-row relative">
        <img src={profileImg} alt="" className="w-[150px] rounded-full" />
        <i
          className={`pen-icon fa-solid fa-pen-to-square text-md absolute right-0 bottom-0 ${
            !toggleSetting && "hidden"
            }`}
          onClick={() => setHideImgSelection(false)}
        ></i>
        <div
          className=""
          id="images-selection-container"
          hidden={hideImgSelection}
        >
          <div className="flex flex-row justify-end">
            <i
              className="fa-solid fa-xmark text-lg px-3 py-1 scale-on-hover cursor-pointer"
              onClick={() => setHideImgSelection(true)}
            ></i>
          </div>
          <ul className="images-selection-list">
            {profileImgs.map((image, index) => (
              <li
                key={"img-" + index}
                className={`image-container ${
                  image.imgUrl === profileImg && "active"
                } `}
                onClick={(e) => {
                  e.preventDefault();
                  setProfileImg(image.imgUrl);
                }}
              >
                <img src={image.imgUrl} className="profile-image" />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-full">
        <div className="flex flex-row justify-center items-center">
          <input
            type="text"
            className="profile-username-input font-semibold text-center text-2xl 3xl:text-3xl focus:outline-none rounded-xl focus:underline"
            disabled={!toggleSetting}
            value={input}
            name="username"
            onChange={(e) => handleOnChange(e)}
            ref={inputRef}
          ></input>
        </div>
        <p className="text-center mb-0 mt-1 text-red-500" hidden={errorHidden}>
          Username is not available.
        </p>
      </div>
    </div>
  );
};

export default UserInfoSection;
