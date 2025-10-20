// src/components/ChatInput.tsx
import { useState } from "react";

type ChatInputProps = {
  onSend: (text: string) => void;
};

export default function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 bg-white rounded-full border border-gray-300 px-3 py-2"
    >
      <input
        type="text"
        className="flex-1 outline-none text-sm placeholder-gray-400"
        placeholder="메시지를 입력하세요..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="submit"
        className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-full hover:bg-blue-600 transition"
      >
        전송
      </button>
    </form>
  );
}
