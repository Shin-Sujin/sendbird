import AiAgentIndicator from "./components/AiAgentIndicator/AiAgentIndicator";

function App() {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-100 text-3xl text-blue-500 font-bold">
        Tailwind Works 🎉
      </div>
      <AiAgentIndicator
        visible={true}
        align="right" // "left" 도 가능
        iconSrc="/images/ai-indicator.png" // 없으면 "AI" 텍스트
        // onClick={() => setIsAgentOpen(true)}
      />
    </>
  );
}

export default App;
