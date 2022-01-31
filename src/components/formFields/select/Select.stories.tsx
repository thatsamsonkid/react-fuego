import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Select } from "./Select";

export default {
  title: "Components/Form Fields/Select",
  component: Select,
  argTypes: {
    // backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export const Default = Template.bind({});
Default.args = {
  options: options,
};

// export const Secondary = Template.bind({});
// Secondary.args = {
//   options: options,
// };

// export const Tertiary = Template.bind({});
// Tertiary.args = {
//   options: options,
// };
