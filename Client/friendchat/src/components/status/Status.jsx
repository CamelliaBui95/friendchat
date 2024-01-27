import "./status.css";
import React, { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";

const statuses = { online: "Online", busy: "Busy", idle: "Idle" };

const Status = () => {
  const { username, status: currentStatus, profile } = useStoreState(
    (state) => state.user
  );
  const [toggleStatusMenu, setToggleStatusMenu] = useState(false);
  const setUserStatus = useStoreActions((actions) => actions.setUserStatus);
  const hidden = !toggleStatusMenu ? "hidden" : "";

  return (
    <div className="status-container flex flex-col justify-center items-center w-full h-[30%] bg-white rounded-xl p-4">
      <div className="flex flex-col justify-center items-center">
        <div className="relative">
          <img
            src={profile.imgUrl}
            alt=""
            className="profile-img w-[90px] h-[90px] 3xl:w-[100px] 3xl:h-[100px] rounded-full mb-1"
          />
          <i
            className={`fa fa-circle status ${currentStatus}`}
            onClick={() => setToggleStatusMenu(!toggleStatusMenu)}
          ></i>
          <ul
            className={`status-menu ${hidden} absolute p-2 m-0 min-w-[120px] bg-white shadow-md rounded-xl`}
          >
            {Object.keys(statuses).map((status, index) => {
              return (
                status !== currentStatus && (
                  <li
                    key={index}
                    className="py-1 px-2 cursor-pointer"
                    onClick={() => setUserStatus(status)}
                  >
                    <i className={"fa fa-circle " + status}></i>
                    <span className="ml-2">{statuses[status]}</span>
                  </li>
                )
              );
            })}
          </ul>
        </div>

        <h3 className="text-blue-dark mt-1 text-2xl">{username}</h3>
      </div>
    </div>
  );
};

export default Status;
