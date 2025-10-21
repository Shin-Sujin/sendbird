// src/components/AiAgentIndicator.tsx
import React from "react";
import Cubot from "./Icon/svg/Cubot";

type Props = {
  /** 표시/비표시 제어 (SCSS의 --visible 역할) */
  visible?: boolean;
  /** 왼쪽/오른쪽 하단 위치 선택 */
  align?: "right" | "left";
  /** 접근성 라벨 */
  ariaLabel?: string;
  /** 클릭 핸들러 */
  onClick?: () => void;
  /** 추가 클래스 */
  className?: string;
};

/**
 * 하단 고정 원형 버튼 (Tailwind)
 * - 기본: 오른쪽 하단 고정, 50px(모바일 47px), z-index:101
 * - 하단 여백은 CSS 변수(--indicator-bottom)로 조절 가능 (기본 24px)
 */
export default function AiAgentIndicator({
  visible = true,
  align = "right",
  ariaLabel = "Open AI Agent",
  onClick,
  className = "",
}: Props) {
  // 위치: 오른쪽/왼쪽 하단 중 선택
  const horizontalPos = align === "right" ? "right-[25px]" : "left-[25px]"; // SCSS의 25px 맞춤

  // 공통 버튼 크기: 데스크탑 50px, 모바일 47px
  const sizeClasses = "w-[50px] h-[50px] max-sm:w-[47px] max-sm:h-[47px]"; // SCSS와 동일 수치

  // 가시성: SCSS의 display:none ↔ flex
  const visibility = visible ? "flex" : "hidden";

  return (
    <div
      // SCSS의 .cubot-indicator-bubble / .cubot-indicator-button 컨테이너 역할
      className={[
        "fixed z-[101]", // z-index: 101
        // 하단 여백: var(--indicator-bottom, 24px)
        "bottom-[var(--indicator-bottom,24px)]",
        horizontalPos,
        // 폰트, 기본 레이아웃
        "font-['Noto_Sans_KR']",
        visibility,
        "flex flex-col items-center",
        className,
      ].join(" ")}
    >
      <button
        type="button"
        aria-label={ariaLabel}
        onClick={onClick}
        className={[
          // 둥근 원형 + 가운데 정렬
          "inline-flex items-center justify-center rounded-full",
          sizeClasses,
          // 배경/테두리/그림자
          "bg-white shadow-lg ring-1 ring-black/10",
          // 인터랙션
          "cursor-pointer select-none",
          "transition-transform duration-200 ease-out",
          "hover:scale-105 active:scale-95",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
          // 오버플로우 (이미지 꽉 차게)
          "overflow-hidden",
        ].join(" ")}
        style={
          {
            // 필요 시 인라인 커스터마이즈 가능
            // 예: filter, backdrop 등
          }
        }
      >
        <Cubot />
      </button>
    </div>
  );
}
