import { useParams } from "react-router-dom";
import {
  Send,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
} from "lucide-react";
import { useState } from "react";

const messages = [
  {
    id: 1,
    sender: "pharmacy",
    text: "Hello 👋 How can we help you today?",
    time: "10:20 AM",
  },
  {
    id: 2,
    sender: "user",
    text: "I need Panadol Extra and Vitamin C tablets.",
    time: "10:21 AM",
  },
  {
    id: 3,
    sender: "pharmacy",
    text: "Sure, both medicines are available.",
    time: "10:22 AM",
  },
  {
    id: 4,
    sender: "user",
    text: "Can you deliver near Hayatabad Phase 3?",
    time: "10:23 AM",
  },
];

const Chat = () => {
  const { id } = useParams();

  console.log(id);
 const [sendMessages , setsendMessages] = useState('')
 const [sendsMessages , setsendsMessages] = useState('')


 const SendMessgaes = (e)=>{
       e.preventDefault()
       setsendsMessages(sendMessages)
      setsendMessages('')
 }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl h-[92vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex">

        {/* Sidebar */}
        <div className="hidden md:flex w-[320px] border-r bg-gray-50 flex-col">

          {/* Sidebar Header */}
          <div className="p-5 border-b bg-white">
            <h2 className="text-2xl font-bold text-gray-800">
              Chats
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Connected Pharmacies
            </p>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">

            <div className="bg-cyan-50 border border-cyan-100 rounded-2xl p-3 cursor-pointer hover:bg-cyan-100 transition">
              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold">
                  GP
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">
                      GreenCare Pharmacy
                    </h3>

                    <span className="text-xs text-gray-400">
                      10:24 AM
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 truncate">
                    Your order is available ✅
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-2xl p-3 cursor-pointer hover:bg-gray-100 transition">
              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                  MP
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">
                      MediPlus
                    </h3>

                    <span className="text-xs text-gray-400">
                      Yesterday
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 truncate">
                    Delivery will arrive soon.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Chat */}
        <div className="flex-1 flex flex-col">

          {/* Chat Header */}
          <div className="h-20 border-b px-6 flex items-center justify-between bg-white">

            <div className="flex items-center gap-3">

              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold text-lg">
                  GP
                </div>

                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              </div>

              <div>
                <h2 className="font-semibold text-gray-800 text-lg">
                  GreenCare Pharmacy
                </h2>

                <p className="text-sm text-green-500">
                  Online
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">

              <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition">
                <Phone className="size-5 text-gray-600" />
              </button>

              <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition">
                <Video className="size-5 text-gray-600" />
              </button>

              <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition">
                <MoreVertical className="size-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white space-y-5">
   
   {sendsMessages}
           
          </div>

          {/* Input Area */}
          <div className="p-4 border-t bg-white">

            <div className="flex items-center gap-3 bg-gray-100 rounded-2xl px-4 py-3">

              <button className="text-gray-500 hover:text-cyan-500 transition">
                <Smile className="size-5" />
              </button>

              <button className="text-gray-500 hover:text-cyan-500 transition">
                <Paperclip className="size-5" />
              </button>

              <input
                type="text"
                value={sendMessages}
                onChange={(e)=>setsendMessages(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
              />

              <button className="w-11 h-11 rounded-full bg-cyan-500 hover:bg-cyan-600 flex items-center justify-center text-white shadow-md transition" onClick={SendMessgaes}>
                <Send className="size-5" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;