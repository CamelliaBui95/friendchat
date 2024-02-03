import React, { useState, useEffect } from "react";
import "./card.css";

const Card = ({
  imgUrl,
  status,
  label,
  index,
  onClick,
  onClose,
  countBadge,
}) => {
  return (
    <li key={index} className="item relative flex flex-row overflow-hidden">
      <div
        className=" flex-grow-1 flex flex-row items-center gap-3 py-2 pl-3 cursor-pointer"
        onClick={onClick}
      >
        <div className="flex flex-row relative">
          <img src={imgUrl} alt="" className="w-[64px] rounded-full" />
          <i
            className={`absolute transform top-[75%] right-0 text-md fa fa-circle ${status} border-2 border-white rounded-full`}
          ></i>
        </div>
        <div className="flex flex-row flex-grow-1 justify-start gap-2 relative">
          <p className="m-0 text-xl">{label}</p>
          {countBadge > 0 && (
            <div className="m-0 text-md flex flex-col justify-center items-center">
              <span className="count-badge px-[5px]">{countBadge}</span>
            </div>
          )}
        </div>
      </div>
      {onClose !== null && label !== "#public" && (
        <i
          className="fa-solid fa-xmark text-lg px-2 absolute z-10 right-0 scale-on-hover cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
        ></i>
      )}
    </li>
  );
};

export default Card;
