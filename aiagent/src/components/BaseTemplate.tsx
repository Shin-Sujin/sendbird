// src/components/BaseTemplate.tsx
import React, { PropsWithChildren, useMemo } from "react";

type Align = "left-bottom" | "right-bottom";

type BaseTemplateProps = {
  visible?: boolean;
  align?: Align;
  offsetX?: number;
  offsetY?: number;
  zIndex?: number;
  ariaLabel?: string;
  ariaDescription?: string;
  className?: string;
  /** ✅ 추가: 본문 클래스를 외부에서 주입해서 배경/패딩 등을 제어 */
  bodyClassName?: string;
  /** ✅ 추가: 푸터 높이에 맞춰 본문 하단 여백(px) */
  contentBottomPadding?: number;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  onClose?: () => void;
};

export default function BaseTemplate({
  visible = false,
  align = "right-bottom",
  offsetX = 20,
  offsetY = 30,
  zIndex = 100000,
  ariaLabel = "Base template dialog",
  ariaDescription,
  className = "",
  /** ✅ 기본값: 본문은 스크롤 가능한 영역 + 가벼운 배경 */
  bodyClassName = "bg-white",
  /** ✅ 기본값: 푸터 높이 확보용 패딩 (기존 pb-40 대체) */
  contentBottomPadding = 56,
  header,
  footer,
  children,
  onClose,
}: PropsWithChildren<BaseTemplateProps>) {
  const alignClass =
    align === "left-bottom"
      ? "left-[var(--bt-offset-x)]"
      : "right-[var(--bt-offset-x)]";

  const visibilityClass = visible ? "translate-y-0" : "translate-y-[125%]";

  const style = useMemo<React.CSSProperties>(
    () => ({
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
        "fixed",
        alignClass,
        "bottom-[var(--bt-offset-y)]",
        "w-[500px] min-h-[300px] max-h-[600px]",
        "bg-white rounded-[20px]",
        "shadow-[0_-1px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.1)]",
        "flex flex-col",
        "transition-all duration-500 ease-out",
        visibilityClass,
        "select-none",
        className,
      ].join(" ")}
      style={style}
      tabIndex={-1}
      onKeyDown={(e) => {
        if (e.key === "Escape" && onClose) onClose();
      }}
    >
      {/* Header */}
      <header
        className={[
          "font-inherit bg-inherit border-b-inherit p-inherit z-inherit overflow-visible rounded-t-[20px]",
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
          "overscroll-contain",
          bodyClassName, // ✅ 외부 주입
        ].join(" ")}
        /* ✅ 푸터 높이만큼 하단 패딩 */
        style={{ paddingBottom: contentBottomPadding }}
      >
        <div className="h-full overflow-y-auto overflow-x-hidden px-4 py-3">
          {children}
        </div>
      </main>

      {/* Footer */}
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
