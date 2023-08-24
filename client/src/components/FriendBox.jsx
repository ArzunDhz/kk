import axios from "axios";
import React, { useEffect, useState } from "react";
const API = import.meta.env.VITE_API;
const FriendBox = ({ data, myId }) => {
  const [friendDataFromApi, setFriendDataFromApi] = useState();
  const friendId = data?.members.find((m) => m != myId);

  useEffect(() => {
    const getFriendData = async () => {
      const { data } = await axios.get(`${API}/user/getUserInfo/${friendId}`, {
        withCredentials: true,
      });
      setFriendDataFromApi(data);
    };
    getFriendData();
  }, []);

  return (
    <>
      <div className="flex justify-center p-1 m-2 rounded-full  bg-slate-600">
        <h1> {friendDataFromApi?.username} </h1>
      </div>
    </>
  );
};

export default FriendBox;
