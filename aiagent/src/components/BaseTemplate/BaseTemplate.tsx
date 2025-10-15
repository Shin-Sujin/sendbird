import React, { PropsWithChildren, useMemo } from "react";

type Align = "left-bottom" | "right-bottom";

type BaseTemplateProps = {
  /** 표시/비표시 */
  visible?: boolean;
  /** 고정 위치 (좌하/우하) */
  align?: Align;
  /** X/Y 오프셋(px) — SCSS의 left/right:20, bottom:30 기본값 */
  offsetX?: number;
  offsetY?: number;
  /** z-index (기본 100000) */
  zIndex?: number;
  /** 접근성: 라벨/디스크립션 */
  ariaLabel?: string;
  ariaDescription?: string;
  /** 추가 클래스 */
  className?: string;

  /** 헤더 / 푸터 전달용 (문자열/노드 모두 가능) */
  header?: React.ReactNode;
  footer?: React.ReactNode;

  /** 닫기 등 외부 인터랙션 필요 시 */
  onClose?: () => void;
};

/**
 * - position: fixed
 * - width: 500px / min-h: 300px / max-h: 600px
 * - translateY로 show/hide 애니메이션
 * - header / main / footer 슬롯
 */
export default function BaseTemplate({
  visible = false,
  align = "right-bottom",
  offsetX = 20,
  offsetY = 30,
  zIndex = 100000,
  ariaLabel = "Base template dialog",
  ariaDescription,
  className = "",
  header,
  footer,
  children,
  onClose,
}: PropsWithChildren<BaseTemplateProps>) {
  // 좌/우 정렬 클래스
  const alignClass =
    align === "left-bottom"
      ? "left-[var(--bt-offset-x)]"
      : "right-[var(--bt-offset-x)]";

  // translateY로 show/hide
  const visibilityClass = visible ? "translate-y-0" : "translate-y-[125%]";

  // 인라인 CSS 변수로 offset 전달
  const style = useMemo<React.CSSProperties>(
    () => ({
      // SCSS: right/left: 20px, bottom: 30px
      ["--bt-offset-x" as any]: `${offsetX}px`,
      ["--bt-offset-y" as any]: `${offsetY}px`,
      position: "fixed",
      zIndex,
      bottom: "var(--bt-offset-y)",
      touchAction: "none",
      fontFamily: "inherit",
    }),
    [offsetX, offsetY, zIndex]
  );

  return (
    <section
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      aria-description={ariaDescription}
      className={[
        // 위치/레이어
        "fixed", // style에서 position 고정
        alignClass,
        "bottom-[var(--bt-offset-y)]",
        // 프레임
        "w-[500px] min-h-[300px] max-h-[600px]",
        "bg-white rounded-[20px]",
        // 그림자(원본과 유사)
        "shadow-[0_-1px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.1)]",
        // 레이아웃
        "flex flex-col",
        // 애니메이션
        "transition-all duration-500 ease-out",
        visibilityClass,
        // 기타
        "select-none",
        className,
      ].join(" ")}
      style={style}
      // ESC 등 외부에서 닫기 붙일 거면 포커스 받을 수 있게 tabIndex 부여
      tabIndex={-1}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose?.();
      }}
    >
      {/* Header */}

      <header
        className={[
          // SCSS의 __header (상위에서 inherit 강제)
          "font-inherit bg-inherit border-b-inherit p-inherit z-inherit overflow-visible rounded-t-[20px]",
          // 실사용 기본 패딩/라인(원한다면 제거 가능)
          "px-4 py-3 border-b border-black/10",
          "flex items-center justify-between",
        ].join(" ")}
      >
        <div className="min-w-0">{header}</div>

        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
        >
          {/* 간단한 X 아이콘 */}
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </header>

      {/* Main */}
      <main
        className={[
          "relative w-full flex-1 min-h-0",
          // SCSS: overscroll-behavior: contain
          "overscroll-contain",
        ].join(" ")}
      >
        {/* 스크롤 컨테이너 (_main__scroll 흉내) */}
        <div className="h-full overflow-y-auto overflow-x-hidden px-4 py-3">
          {children}
        </div>
      </main>

      {/* Footer (absolute bottom) */}
      <footer
        className={[
          "absolute left-0 right-0 bottom-0",
          "px-4 py-3 text-[12px] text-[#666]",
          "bg-inherit font-inherit z-inherit",
          "border-t border-black/10",
          "rounded-b-[20px]",
        ].join(" ")}
      >
        {footer}
      </footer>
    </section>
  );
}
