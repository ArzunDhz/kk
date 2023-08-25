import React, { useEffect, useState } from "react";
import { useStore } from "../store/store";
import axios from "axios";
import { EarthImg } from "../assets/images";
import * as timeago from "timeago.js";
const SearchedUser = () => {
  const { searchUserId, setSearchUserID } = useStore();
  const [userData, setUserData] = useState([]);
  const API = import.meta.env.VITE_API;
  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get(
        `${API}/user/getUserInfo/${searchUserId}`,
        { withCredentials: true }
      );
      console.log(data);
      setUserData(data);
    };

    getUserInfo();
  }, []);
  return (
    <>
      <div className="flex justify-center w-full h-screen overflow-hidden sm:flex-col bg-primary">
        {/* contain both image and form */}
        <h1 className=" md:hidden sm:visible text-center bg-primary text-[40px] text-pop">
          Kuranai
        </h1>
        <div className="flex items-center w-full h-screen justify-evenly">
          {/* image container */}
          <div className=" sm:hidden">
            <img
              src={EarthImg}
              alt="EathImage"
              height={400}
              width={400}
              className="object-contain "
            />
            <h1 className=" text-[5vw]  text-pop text-center ">KuraKani</h1>
            <h1 className="text-center text-[2vw] text-white">
              Boli nai Goli ho
            </h1>
          </div>

          {/* form container */}
          <div className="">
            <div className=" shadow-2xl  sm:w-[400px]  form lg:w-[450px]  rounded-xl h-[450px]  items-center flex flex-col space-y-3  ">
              <div className="flex items-center justify-center w-32 h-32 mt-2 text-4xl font-bold rounded-full bg-pop">
                <h1>{userData?.username?.slice(0, 1)}</h1>
              </div>
              <h1>Username : {userData?.username}</h1>
              <h1>Id : {userData?._id}</h1>
              <h1>Joined Kurakani : {timeago.format(userData?.createdAt)}</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchedUser;
