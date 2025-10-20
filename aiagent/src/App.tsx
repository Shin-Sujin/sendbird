// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import BaseTemplate from "./components/BaseTemplate/BaseTemplate";
import AiAgentIndicator from "./components/AiAgentIndicator/AiAgentIndicator";

function App() {
  const [isAgentOpen, setIsAgentOpen] = useState(false);

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
                iconSrc="/images/ai-indicator.png"
                onClick={() => setIsAgentOpen(true)} // ✅ 클릭 시 채팅창 열기
              />

              {/* ✅ 채팅창(BaseTemplate) */}
              <BaseTemplate
                visible={isAgentOpen}
                onClose={() => setIsAgentOpen(false)}
                header={<div className="font-medium">AI Chat</div>}
                footer={<div>입력창은 다음 단계에서 추가할 예정</div>}
              >
                <div className="text-sm text-gray-600">
                  여기에 채팅 메시지가 표시될 영역입니다.
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
