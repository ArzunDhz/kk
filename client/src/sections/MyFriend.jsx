import React, { useEffect, useState } from "react";
import axios from "axios";
import FriendBox from "../components/FriendBox";
const API = import.meta.env.VITE_API;
const MyFriend = () => {
  const [myConversations, setMyConversations] = useState();
  const [myId, setMyId] = useState();
  useEffect(() => {
    const getMyConversationFriends = async () => {
      const { data } = await axios.get(`${API}/getMyConnection`, {
        withCredentials: true,
      });
      console.log(data.data);
      setMyConversations(data.data);
      setMyId(data.myId);
    };
    getMyConversationFriends();
  }, []);
  return (
    <>
      <div className="bg-black h-[60px] md:flex  lg:flex-col sm:flex space-x-4  overflow-x-scroll  lg:space-y-4 items-center   lg:h-screen lg:overflow-y-scroll  mt-10">
        {myConversations?.map((conversation) => (
          <div className="">
            <FriendBox data={conversation} myId={myId} />
          </div>
        ))}
      </div>
    </>
  );
};

export default MyFriend;
