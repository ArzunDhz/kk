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
      setMyConversations(data.data);
      setMyId(data.myId);
    };
    getMyConversationFriends();
  }, []);
  return (
    <>
      <div className="items-center space-x-4 overflow-x-scroll bg-black h-fit md:flex sm:items-center lg:flex-col sm:flex lg:space-y-4 lg:items-start lg:h-screen lg:overflow-y-scroll">
        {myConversations?.map((conversation) => (
          <div className="mt-4 cursor-pointer">
            <FriendBox data={conversation} myId={myId} />
          </div>
        ))}
      </div>
    </>
  );
};

export default MyFriend;
