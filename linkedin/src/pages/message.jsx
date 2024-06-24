import React, { useEffect, useState } from "react";
import { apiConnector } from "../services/apiConnector";
import { GetGlobalProps } from "../context";

const Message = () => {
  const [room, setRoom] = useState(false);
  const [text, setText] = useState("");
  const [to, setTo] = useState("");
  const [chat, setChat] = useState([]);
  const {currentAccount} = GetGlobalProps();
  const [loading, setIsloading] = useState(false);
  async function initRoom() {
    if (text !== "" && currentAccount !== "") {
      setTo(text);
      setRoom(true);
      setIsloading(true);
      const data = {
        from: currentAccount,
        to: text,
      };
      console.log(data);
      const response = await apiConnector("POST", "http://localhost:5000/roomInit", data);
      const chatArray = response.data.data;
      chatArray.sort((a, b) => new Date(a._createdAt) - new Date(b._createdAt));
      setChat(chatArray);
      console.log(response);
      setIsloading(false);
    }
  }
  async function sendMessage() {
    if(text != "" && to != ""){
      setIsloading(true);
      const data = {
        from: currentAccount,
        to,
        message: text
      };
      console.log(data);
      const response = await apiConnector("POST", "http://localhost:5000/sendMessage", data);
      const chatArray = response.data.data;
      chatArray.sort((a, b) => new Date(a._createdAt) - new Date(b._createdAt));
      setChat(chatArray);
      setText("");
      setIsloading(false);
    }
  }
  return (
    <div className="bg-[#f6f6f6] pt-[5rem] flex flex-col gap-4 justify-center items-center p-4 min-h-screen">
      <div className="bg-[#ffffff] w-[80%] md:w-[40%] min-w-[320px] h-[80vh] rounded-md border-2 flex flex-col justify-between">
        <div className="p-2">
          <div className="mb-2 text-slate-600">Messaging</div>
          <hr />
        </div>
        <div className="overflow-y-scroll h-[550px] p-2 ">
          {
              chat.map((singleChat) => {
                const isCurrentUser = singleChat._from.toLowerCase() === currentAccount.toLowerCase();
                const messageClasses = isCurrentUser 
                  ? "flex flex-col place-items-end p-2" 
                  : "p-2";
                const messageWrapperClasses = isCurrentUser 
                  ? "bg-[#d6e8fb]/50 text-slate-600 max-w-max p-2 rounded-lg"
                  : "bg-gray-200 text-slate-600 max-w-max p-2 rounded-lg";

                return (
                  <div key={singleChat._id} className={messageClasses}>
                    <div className={messageWrapperClasses}>
                      {singleChat._text}
                    </div>
                  </div>
                  );
              })
          }
        </div>
        <div className="p-2 flex items-end justify-between gap-4">
          <div className="w-full">
            <input
              onChange={(event) => {
                setText(event.target.value);
              }}
              value={text}
              type="text"
              className="w-full p-2 border-slate-300 border-2 rounded-sm"
            ></input>
          </div>
          <div>
            {!room && (
              <button onClick={initRoom} className="text-[#0b67c2] rounded-md bg-[#0b67c2]/20 p-2 mt-8 cursor-pointer text-md font-bold hover:scale-95 duration-200 w-32">
                Create Room
              </button>
            )}
          </div>
          <div>
            {room && (
              <button onClick={sendMessage} className="text-[#01744e] rounded-md bg-[#01744e]/20 p-2 mt-8 cursor-pointer text-md font-bold hover:scale-95 duration-200 w-32">
                Send Message
              </button>
            )}
          </div>
          <div>
            {room && (
              <button onClick={initRoom} className="text-[#0b67c2] rounded-md bg-[#0b67c2]/20 p-2 mt-8 cursor-pointer text-md font-bold hover:scale-95 duration-200 w-32">
                Switch Room
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
