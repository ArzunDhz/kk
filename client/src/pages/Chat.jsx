import React, { useEffect, useRef, useState } from "react";
import MyInfoBar from "../sections/MyInfoBar";
import MyFriend from "../sections/MyFriend";
import { HeroImg } from "../assets/images";
import { currentLoggedInUserInfoStore, currentUserStore } from "../store/store";
import axios from "axios";
import Messages from "../components/Messages";
import { io } from "socket.io-client";
const API = import.meta.env.VITE_API;
const Chat = () => {
  const { currentUserId, currentReceiverId } = currentUserStore();
  const { myInfo, getMyinfo } = currentLoggedInUserInfoStore();
  const [messages, setMessages] = useState();
  const [messageFromTextBox, setMessageFromTextBox] = useState("");
  const [currentLoggedUserId, setCurrentLoggedUserID] = useState();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [myConversations, setMyConversations] = useState();
  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    getMyinfo();
  }, []);

  useEffect(() => {
    const getMyConversationFriends = async () => {
      const { data } = await axios.get(`${API}/getMyConnection`, {
        withCredentials: true,
      });
      setMyConversations(data?.data);
    };
    getMyConversationFriends();
  }, []);

  useEffect(() => {
    const getMessage = async () => {
      const { data } = await axios.get(`${API}/getMessage/${currentUserId}`, {
        withCredentials: true,
      });
      setCurrentLoggedUserID(data.currentUser);
      setMessages(data.getMessage);
    };

    getMessage();
  }, [currentUserId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.current = io("http://localhost:8000");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      myConversations?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    socket.current.emit("addUser", myInfo?._id);
  }, [myInfo?._id]);

  const handelSendMessage = async (e) => {
    e.preventDefault();
    if (messageFromTextBox.length == 0) return 0;
    const { data } = await axios.post(
      `${API}/sendMessage`,
      {
        conversationId: currentUserId,
        text: messageFromTextBox,
      },
      { withCredentials: true }
    );
    setMessages([...messages, data.savedMessage]);

    if (currentReceiverId) {
      socket.current.emit("send-message", {
        senderId: myInfo?._id,
        receiverId: currentReceiverId,
        text: messageFromTextBox,
      });
    }
    setMessageFromTextBox("");
  };

  // useEffect(() => {
  //   receivedMessage &&
  //     currentChat?.members.includes(arrivalMessage.sender) &&
  //     setMessages((prev) => [...prev, arrivalMessage]);
  // }, [arrivalMessage, currentChat]);

  return (
    <>
      <div className=" min-h-screen lg:flex  text-pop bg-primary w-100% ">
        <div className=" lg:w-1.5/6">
          <section className=" bg-primary">
            <MyInfoBar />
          </section>
          <section>
            <MyFriend />
          </section>
        </div>

        <section className="grid min-h-screen lg:w-5/6 bg-slate-800 place-items-center ">
          {!currentUserId && (
            <img src={HeroImg} width={270} alt="heroImg" srcset="" />
          )}

          <div className="flex flex-col w-full min-h-screen bg-red-200">
            <div className="hidden bg-green-900 overflow-y-clip">
              {currentUserId &&
                messages?.map((m) => (
                  <div>
                    <Messages
                      key={m?._id}
                      message={m}
                      own={m?.sender == currentLoggedUserId}
                    />
                  </div>
                ))}
            </div>

            <form className="flex bg-red-600 " onSubmit={handelSendMessage}>
              <input
                required
                type="text"
                className="  text-white flex-grow bg-slate-700  indent-3 h-[40px] "
                placeholder="Text..."
                value={messageFromTextBox}
                onChange={(e) => setMessageFromTextBox(e.target.value)}
              />
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default Chat;
