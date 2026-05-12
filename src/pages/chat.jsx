import { useParams } from "react-router-dom";
import {
  Send,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { SocketClient } from "@/utils/socketClient";
import { useSelector } from "react-redux";

const Chat = () => {
  const { id } = useParams();

  const [sendMessages, setsendMessages] = useState("");
  const [messages, setmessages] = useState([]);

  const socketRef = useRef(null);

  const user = useSelector((store) => store?.user);

  const userid = user?._id;
  const name = user?.FullName;
  const image = user?.Photo

  // SOCKET CONNECTION
  useEffect(() => {
    if (!user) return;

    socketRef.current = SocketClient();

    // JOIN CHAT
    socketRef.current.emit("JoinChat", {
      name,
      userid,
      id,
    });

    // RECEIVE MESSAGE
    const handleMessage = (data) => {
      setmessages((prev) => [...prev, data]);
    };

    socketRef.current.on("RecievedMessage", handleMessage);

    return () => {
      socketRef.current.off("RecievedMessage", handleMessage);
    };
  }, [user, id]);

  // SEND MESSAGE
  const SendMessgaes = (e) => {
    e.preventDefault();

    if (!sendMessages.trim()) return;

    const messageData = {
      name,
      userid,
      id,
      text: sendMessages,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    socketRef.current.emit("SendMessages", messageData);

    setsendMessages("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center p-4">

      <div className="w-full max-w-5xl h-[92vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex">

        {/* SIDEBAR */}
        <div className="hidden md:flex w-[320px] border-r bg-gray-50 flex-col">

          <div className="p-5 border-b bg-white">
            <h2 className="text-2xl font-bold text-gray-800">
              Chats
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Connected Users
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-3">

            <div className="bg-cyan-50 border border-cyan-100 rounded-2xl p-3">

              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold">
                  {name?.charAt(0)?.toUpperCase()}
                </div>

                <div className="flex-1">

                  <div className="flex items-center justify-between">

                    <h3 className="font-semibold text-gray-800">
                      Active Chat
                    </h3>

                    <span className="text-xs text-gray-400">
                      Live
                    </span>

                  </div>

                  <p className="text-sm text-gray-500 truncate">
                    Real-time conversation
                  </p>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN CHAT */}
        <div className="flex-1 flex flex-col">

          {/* HEADER */}
          <div className="h-20 border-b px-6 flex items-center justify-between bg-white">

            <div className="flex items-center gap-3">

              <div className="relative">

                <div className="w-12 h-12 rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold text-lg">
                  <img className="w-12 h-12 rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold text-lg" src= {image || name?.charAt(0)?.toUpperCase()} alt="image"/>
                </div>

                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>

              </div>

              <div>
                <h2 className="font-semibold text-gray-800 text-lg">
                  Chat Room
                </h2>

                <p className="text-sm text-green-500">
                  Online
                </p>
              </div>

            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-3">

              <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                <Phone className="size-5 text-gray-600" />
              </button>

              <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                <Video className="size-5 text-gray-600" />
              </button>

              <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                <MoreVertical className="size-5 text-gray-600" />
              </button>

            </div>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white space-y-4">

            {messages.length > 0 ? (
              messages.map((msg, index) => {

                // FIXED ALIGNMENT CHECK
                const isMe =
                  String(msg?.userid).trim() ===
                  String(userid).trim();

                return (
                  <div
                    key={index}
                    className={`w-full flex ${
                      isMe
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >

                    <div
                      className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-sm ${
                        isMe
                          ? "bg-cyan-500 text-white rounded-br-sm"
                          : "bg-white border text-gray-700 rounded-bl-sm"
                      }`}
                    >

                      {/* NAME */}
                      <div
                        className={`text-xs font-semibold mb-1 ${
                          isMe
                            ? "text-cyan-100"
                            : "text-teal-500"
                        }`}
                      >
                        {msg?.name}
                      </div>

                      {/* MESSAGE */}
                      <p className="text-sm break-words">
                        {msg?.text}
                      </p>

                      {/* TIME */}
                      <div
                        className={`text-[11px] mt-2 text-right ${
                          isMe
                            ? "text-cyan-100"
                            : "text-gray-400"
                        }`}
                      >
                        {msg?.time}
                      </div>

                    </div>
                  </div>
                );
              })
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                No messages yet. Start conversation
              </div>
            )}

          </div>

          {/* INPUT */}
          <form
            onSubmit={SendMessgaes}
            className="p-4 border-t bg-white"
          >

            <div className="flex items-center gap-3 bg-gray-100 rounded-2xl px-4 py-3">

              <button
                type="button"
                className="text-gray-500 hover:text-cyan-500"
              >
                <Smile className="size-5" />
              </button>

              <button
                type="button"
                className="text-gray-500 hover:text-cyan-500"
              >
                <Paperclip className="size-5" />
              </button>

              <input
                type="text"
                value={sendMessages}
                onChange={(e) =>
                  setsendMessages(e.target.value)
                }
                placeholder="Type your message..."
                className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
              />

              <button
                type="submit"
                className="w-11 h-11 rounded-full bg-cyan-500 hover:bg-cyan-600 flex items-center justify-center text-white"
              >
                <Send className="size-5" />
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;