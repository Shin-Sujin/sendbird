// src/pages/Playground.tsx (임시)
import { useState } from "react";
import BaseTemplate from "../components/BaseTemplate/BaseTemplate";

export default function Playground() {
  const [open, setOpen] = useState(true);

  return (
    <>
      <button
        className="fixed bottom-6 right-6 rounded-full px-4 py-2 bg-black text-white"
        onClick={() => setOpen(true)}
      >
        Open Chat
      </button>

      <BaseTemplate
        visible={open}
        onClose={() => setOpen(false)}
        header={<div className="font-medium">AI Chat (demo)</div>}
        footer={<div>여기엔 곧 입력창이 들어갑니다</div>}
        bodyClassName="bg-white" // 배경 자유롭게
        contentBottomPadding={64} // 푸터 높이에 맞춰 조절
      >
        <div className="text-sm text-gray-600">
          본문 스크롤 영역 테스트. (다음 단계에서 iframe/메시지 리스트가 들어갈
          자리)
        </div>
      </BaseTemplate>
    </>
  );
}
