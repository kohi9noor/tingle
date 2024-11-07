import { useRootContext } from "../../context/root.context";

import {
  AudioLinesIcon,
  BarChart,
  CameraIcon,
  ChartBar,
  Copy,
  Instagram,
  MessageCircle,
  VideoIcon,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export default function Home() {
  const { state, sendPreOffer } = useRootContext();
  const [userPersonalCode, setUserPersonalCode] = useState<string | undefined>(
    undefined
  );
  function handleChatButton() {
    if (userPersonalCode) {
      const callType = "CHAT";
      sendPreOffer(userPersonalCode, callType);
    } else {
      alert("please give personal code of the user ");
    }
  }

  function handleVideoButton() {}

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-80 bg-blue-600 p-6 text-white">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">Tingle</h1>
          <p className="text-sm opacity-90">
            Talk with other user by passing his personal code or talk with
            strangers!
          </p>
        </div>

        <div className="mb-8">
          <p className="text-sm mb-2">Your Personal Code</p>
          <div className="bg-blue-500 rounded-lg p-3 flex justify-between items-center">
            <span className="font-mono">{state?.socketId}</span>
            <button className="text-white hover:opacity-80">
              <Copy
                size={20}
                onClick={() => {
                  navigator.clipboard &&
                    navigator.clipboard.writeText(state?.socketId);
                }}
              />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="mb-6">
            <p className="text-sm mb-2">Personal Code</p>
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserPersonalCode(e.target.value)
              }
              type="text"
              className="w-full bg-blue-500 rounded-lg p-3 text-white placeholder-blue-200 outline-none"
              placeholder="Enter personal code"
            />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleChatButton}
              className="flex-1 bg-white text-blue-600 rounded-lg py-2 px-4 flex items-center justify-center space-x-2 hover:bg-blue-50"
            >
              <ChartBar />
              <span>Chat</span>
            </button>
            <button
              onClick={handleVideoButton}
              className="flex-1 bg-white text-blue-600 rounded-lg py-2 px-4 flex items-center justify-center space-x-2 hover:bg-blue-50"
            >
              <VideoIcon />
              <span>Video Call</span>
            </button>
          </div>

          <div className="pt-4">
            <p className="text-sm mb-4">Stranger</p>
            <div className="flex space-x-4">
              <button className="flex-1 bg-white text-blue-600 rounded-lg py-2 px-4 flex items-center justify-center space-x-2 hover:bg-blue-50">
                <MessageCircle />
                <span>Chat</span>
              </button>
              <button className="flex-1 bg-white text-blue-600 rounded-lg py-2 px-4 flex items-center justify-center space-x-2 hover:bg-blue-50">
                <VideoIcon />
                <span>Video Call</span>
              </button>
            </div>
          </div>

          <div className=" pt-4 flex items-center gap-4">
            <Checkbox id="terms" />
            <span>Allow Strangers To connect</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Video Area */}
        <div className="flex-1 bg-gray-900 relative">
          <div className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden">
            <div className="w-full h-full bg-gray-700"></div>
          </div>
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-6">
            <button className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-gray-600">
              <CameraIcon size={24} />
            </button>
            <button className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600">
              <VideoIcon size={24} />
            </button>
            <button className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-gray-600">
              <AudioLinesIcon size={24} />
            </button>
            <button className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-gray-600">
              <Instagram size={24} />
            </button>
            <button className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-gray-600">
              <BarChart size={24} />
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="w-80 bg-white border-l">
          <div className="h-full flex flex-col">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Chat</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">Hello</p>
                  <p className="text-xs text-gray-500 mt-1">09:43 PM</p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-blue-600 text-white rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">Hi, How are you?</p>
                  <p className="text-xs opacity-80 mt-1">09:44 PM</p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">I'm good and you?</p>
                  <p className="text-xs text-gray-500 mt-1">09:44 PM</p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-blue-600 text-white rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">I'm also fine</p>
                  <p className="text-xs opacity-80 mt-1">09:45 PM</p>
                </div>
              </div>
            </div>
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <button className="text-gray-500 hover:text-gray-700">
                  <BarChart size={24} />
                </button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
