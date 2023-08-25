import React from "react";
import MyInfoBar from "../sections/MyInfoBar";
import MyFriend from "../sections/MyFriend";
import { HeroImg } from "../assets/images";

const Chat = () => {
  return (
    <>
      <div className="h-screen  lg:flex  overflow-hidden text-pop bg-primary w-100% ">
        <div className=" lg:w-1.5/6">
          <section className=" bg-primary">
            <MyInfoBar />
          </section>
          <section>
            <MyFriend />
          </section>
        </div>

        <section className="grid h-full lg:w-5/6 bg-slate-800 place-items-center ">
          <img src={HeroImg} width={270} alt="heroImg" srcset="" />
        </section>
      </div>
    </>
  );
};

export default Chat;
