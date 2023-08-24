import React from "react";
import { SearchUserIcon } from "../assets/icons";

const MyInfoBar = () => {
  return (
    <>
      <div className="flex items-center mx-2 ">
        <div className="flex-grow mt-2 ">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-pop ">
            <h1 className="text-black">A</h1>
          </div>
        </div>
        <div className="mt-2 ">
          <img src={SearchUserIcon} width={34} height={34} alt="" srcset="" />
        </div>
      </div>
    </>
  );
};

export default MyInfoBar;
