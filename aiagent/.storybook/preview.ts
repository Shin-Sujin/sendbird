import type { Preview } from "@storybook/react-webpack5";
import "../src/index.css";
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        light: { name: "light", value: "#ffffff" },
        dark: { name: "dark", value: "#0f172a" },
        gray: { name: "gray", value: "#f3f4f6" },
        "custom-blue": { name: "custom-blue", value: "#e0f2fe" }
      }
    },
  },

  initialGlobals: {
    backgrounds: {
      value: "light"
    }
  }
};

export default preview;
