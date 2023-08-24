import React from "react";
import MyInfoBar from "../sections/MyInfoBar";
import MyFriend from "../sections/MyFriend";

const Chat = () => {
  return (
    <>
      <div className="h-screen  lg:flex  overflow-hidden text-pop bg-primary w-100% ">
        <div className=" lg:w-1/6">
          <section className=" bg-primary">
            <MyInfoBar />
          </section>
          <section>
            <MyFriend />
          </section>
        </div>

        <section className="h-full lg:w-5/6 bg-slate-800 ">Chat Image</section>
      </div>
    </>
  );
};

export default Chat;
