import type { Meta, StoryObj } from "@storybook/react-webpack5";
import AiAgentIndicator from "components/AiAgentIndicator";

const meta: Meta<typeof AiAgentIndicator> = {
  title: "Components/AiAgentIndicator", // Storybook 사이드바에 보이는 이름
  component: AiAgentIndicator,
  tags: ["autodocs"], // Storybook 7 이상일 경우 자동 문서화
  argTypes: {
    align: {
      control: { type: "radio" },
      options: ["left", "right"],
    },
    visible: { control: "boolean" },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof AiAgentIndicator>;

/** 기본 버튼 */
export const Default: Story = {
  args: {
    visible: true,
    align: "right",
  },
};

/** 왼쪽 정렬 버튼 */
export const LeftAligned: Story = {
  args: {
    visible: true,
    align: "left",
  },
};

/** 아이콘 있는 버튼 */
export const WithIcon: Story = {
  args: {
    visible: true,
  },
};
