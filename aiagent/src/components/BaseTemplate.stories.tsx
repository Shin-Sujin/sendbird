// src/components/BaseTemplate/BaseTemplate.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import BaseTemplate from "./BaseTemplate";

const meta: Meta<typeof BaseTemplate> = {
  title: "Layout/BaseTemplate",
  component: BaseTemplate,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    align: {
      control: { type: "radio" },
      options: ["left-bottom", "right-bottom"],
    },
    visible: { control: "boolean" },
    offsetX: { control: { type: "number", min: 0, max: 100, step: 1 } },
    offsetY: { control: { type: "number", min: 0, max: 200, step: 1 } },
  },
};

export default meta; // ✅ default export는 반드시 '객체'여야 함
type Story = StoryObj<typeof BaseTemplate>;

export const Default: Story = {
  args: {
    visible: true,
    align: "right-bottom",
    offsetX: 20,
    offsetY: 30,
    header: <div className="text-sm font-medium">AI Agent</div>,
    footer: (
      <div className="flex items-center justify-between">
        <span>샘플 푸터 텍스트</span>
        <button className="px-3 py-1 rounded-md text-xs ring-1 ring-black/10 hover:bg-black/5">
          액션
        </button>
      </div>
    ),
    children: (
      <div className="space-y-3 pb-14">
        {Array.from({ length: 25 }).map((_, i) => (
          <p key={i} className="text-sm text-gray-600">
            리스트 아이템 {i + 1}
          </p>
        ))}
      </div>
    ),
  },
};

export const LeftBottom: Story = {
  args: { ...Default.args, align: "left-bottom" },
};

export const Hidden: Story = {
  args: { ...Default.args, visible: false },
};
