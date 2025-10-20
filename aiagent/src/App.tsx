// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import BaseTemplate from "./components/BaseTemplate/BaseTemplate";
import AiAgentIndicator from "./components/AiAgentIndicator/AiAgentIndicator";
import ChatInput from "./components/ChatInput";
import SendBird from "sendbird";

const sb = new SendBird({ appId: "YOUR_APP_ID" });
function App() {
  const [isAgentOpen, setIsAgentOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const handleSend = (text: string) => {
    console.log("보낸 메시지:", text);
    setMessages((prev) => [...prev, text]);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="flex min-h-screen items-center justify-center bg-gray-100 text-3xl text-blue-500 font-bold">
                Tailwind Works 🎉
              </div>

              <AiAgentIndicator
                visible={true}
                align="right"
                onClick={() => setIsAgentOpen(true)} // ✅ 클릭 시 채팅창 열기
              />

              {/* ✅ 채팅창(BaseTemplate) */}
              <BaseTemplate
                visible={isAgentOpen}
                onClose={() => setIsAgentOpen(false)}
                header={<div className="font-medium">AI Chat</div>}
                footer={<ChatInput onSend={handleSend} />}
                bodyClassName="bg-white"
                contentBottomPadding={72} // 입력창 높이에 맞게 조절
              >
                <div className="flex flex-col gap-2 text-sm text-gray-800">
                  {messages.length === 0 && (
                    <div className="text-gray-400 text-center mt-8">
                      아직 메시지가 없습니다.
                    </div>
                  )}
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className="self-end bg-blue-500 text-white px-3 py-2 rounded-lg max-w-[80%]"
                    >
                      {msg}
                    </div>
                  ))}
                </div>
              </BaseTemplate>
            </>
          }
        />
        {/* 추후 다른 페이지를 추가할 때 여기에 Route 추가 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
