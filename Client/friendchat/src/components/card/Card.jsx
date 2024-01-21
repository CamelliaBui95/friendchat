import React, { useState, useEffect } from 'react';
import "./card.css";

const Card = ({imgUrl, status, label, index, onClick, onClose}) => {
  return (
    <li
      className="item flex flex-row items-center gap-3 py-2 pl-3 cursor-pointer overflow-hidden"
      key={index}
      onClick={onClick}
    >
      <div className="flex flex-row relative">
        <img src={imgUrl} alt="" className="w-[64px] rounded-full" />
        <i
          className={`absolute transform top-[75%] right-0 text-md fa fa-circle ${status}`}
        ></i>
      </div>
      <div className='flex flex-row flex-grow-1 justify-between relative'>
        <p className="m-0 text-xl">{label}</p>
        {(onClose !== null && label !== "#public") && <i className="fa-solid fa-xmark text-lg px-2 absolute right-0 top-[-70%] scale-on-hover" ></i>}
      </div>
    </li>
  );
}

export default Card;