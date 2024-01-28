import React from "react";
import "./profile.css";

const Profile = ({ user }) => {
  const { profile } = user;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  const handleClickIcon = (e) => {
    e.preventDefault();
    console.log("icon clicked");
  };

  return (
    <div className="profile w-[90%] h-[90%] bg-white rounded-lg shadow-md overflow-hidden">
      <div className="grid grid-rows-5 h-full w-full p-2">
        <div className="row-span-2 border-b-2 border-slate-200 grid grid-cols-4 gap-2">
          <div className="col-span-1 flex flex-col justify-center items-center gap-3">
            <div className="section-container flex flex-row relative">
              <img
                src={profile.imgUrl}
                alt=""
                className="w-[150px] rounded-full"
              />
              <i class="pen-icon fa-solid fa-pen-to-square text-md absolute right-0 bottom-0"></i>
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
                  value={user.username}
                ></input>
              </form>
            </div>
          </div>
          <div className="col-span-3 flex flex-col justify-start gap-1 py-2 px-3">
            <div className="section-container flex flex-row justify-start items-center gap-3">
              <h3 className="pl-2 3xl:text-4xl">About Me</h3>
              <i class="pen-icon fa-solid fa-pen-to-square text-md"></i>
            </div>
            <form className="flex-grow-1 overflow-hidden">
              <textarea
                className="desc-input w-full h-full rounded-lg py-1 px-2 text-xl 3xl:text-3xl overflow-y-auto break-all"
                value={profile.description}
              ></textarea>
            </form>
          </div>
        </div>
        <div className="row-span-3 p-2 grid grid-rows-4">
          <div className=" row-span-1">
            <h3 className="3xl:text-4xl">Interests</h3>
          </div>
          <div className="row-span-2"></div>
          <div className="row-span-1 w-full flex flex-row justify-end items-center">
            <button className="secondary-btn text-xl">Say Hi 👋</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

//<i class="fa-solid fa-pen-to-square"></i>
