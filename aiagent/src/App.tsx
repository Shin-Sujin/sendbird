// src/App.tsx
import { useEffect, useState } from "react";
import { connectAndGetChannel } from "lib/chatChannel";
import AiAgentIndicator from "components/AiAgentIndicator";
import BaseTemplate from "components/BaseTemplate";
import ChatInput from "./components/ChatInput";

import type { GroupChannel } from "@sendbird/chat/groupChannel";
import type {
  UserMessageCreateParams,
  BaseMessage,
  UserMessage,
  FileMessage,
} from "@sendbird/chat/message";
import { MessageType } from "@sendbird/chat/message";
type Msg = { id: number; text: string; sender?: string };

const CURRENT_USER_ID = "your_dashboard_user_id"; // 실제 유저 ID로 교체

// 런타임 타입 좁히기: BaseMessage -> 화면에 뿌릴 Msg로 변환
function toMsg(m: BaseMessage): Msg {
  switch (m.messageType) {
    case MessageType.USER: {
      const u = m as UserMessage;
      return {
        id: u.messageId,
        text: u.message ?? "",
        sender: u.sender?.userId,
      };
    }
    case MessageType.FILE: {
      const f = m as FileMessage;
      // 파일 메시지는 파일명으로 간단 표시 (원하면 링크/썸네일 표시 로직 추가)
      return {
        id: f.messageId,
        text: f.name ?? "(파일)",
        sender: f.sender?.userId,
      };
    }
    default: {
      // AdminMessage 등 (message, sender가 없을 수 있어 any 안전 처리)
      const anyMsg = m as any;
      return {
        id: m.messageId,
        text: anyMsg?.message ?? "",
        sender: anyMsg?.sender?.userId,
      };
    }
  }
}

function App() {
  const [isAgentOpen, setIsAgentOpen] = useState(false);
  const [channel, setChannel] = useState<GroupChannel | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [sending, setSending] = useState(false);

  // ✅ 채팅창 열릴 때 채널 준비 + 이전 메시지 로드
  useEffect(() => {
    if (!isAgentOpen) return;
    (async () => {
      try {
        const ch = await connectAndGetChannel(CURRENT_USER_ID);
        setChannel(ch);

        const prev = await ch.getMessagesByTimestamp(Date.now(), {
          prevResultSize: 10,
          nextResultSize: 0,
          includeMetaArray: true,
        });

        // prev: BaseMessage[] 로 가정하고 안전 변환
        setMessages([...prev].reverse().map(toMsg));
      } catch (e) {
        console.error("채널 준비 실패:", e);
      }
    })();
  }, [isAgentOpen]);

  // ✅ 메시지 전송
  const handleSend = (text: string) => {
    if (!channel || !text.trim()) return;

    const params: UserMessageCreateParams = {
      message: text,
      data: JSON.stringify({ role: "user" }),
    };

    const req = channel.sendUserMessage(params);

    // 1) 전송 중
    req.onPending(() => {
      setSending(true);
    });

    // 2) 전송 성공 — 여기서 message는 제네릭 추론으로 UserMessage로 잡힘
    req.onSucceeded((message) => {
      setMessages((prev) => [...prev, toMsg(message as BaseMessage)]);
      setSending(false);
    });

    // 3) 전송 실패
    req.onFailed((err) => {
      console.error("전송 실패 ❌", err);
      setSending(false);
    });
  };

  return (
    <>
      {/* 메인 화면 */}
      <div className="flex min-h-screen items-center justify-center bg-gray-100 text-3xl text-blue-500 font-bold">
        AI AGENT TEST PAGE 🎉
      </div>

      {/* 하단 AI Indicator 버튼 */}
      <AiAgentIndicator
        visible
        align="right"
        onClick={() => setIsAgentOpen(true)}
      />

      {/* 채팅창 */}
      <BaseTemplate
        visible={isAgentOpen}
        onClose={() => setIsAgentOpen(false)}
        header={<div className="font-medium">AI Chat</div>}
        footer={<ChatInput onSend={handleSend} />}
        bodyClassName="bg-white"
        contentBottomPadding={72}
      >
        <div className="flex flex-col gap-2 text-sm text-gray-800">
          {messages.length === 0 && (
            <div className="text-gray-400 text-center mt-8">
              아직 메시지가 없습니다.
            </div>
          )}
          {messages.map((m) => (
            <div
              key={m.id}
              className={`max-w-[80%] px-3 py-2 rounded-lg ${
                m.sender === CURRENT_USER_ID
                  ? "self-end bg-blue-500 text-white"
                  : "self-start bg-gray-200 text-gray-800"
              }`}
            >
              {m.text}
            </div>
          ))}
        </div>

        {sending && (
          <div className="absolute bottom-20 right-4 text-xs text-gray-400">
            전송 중…
          </div>
        )}
      </BaseTemplate>
    </>
  );
}

export default App;
