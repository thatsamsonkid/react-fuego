import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from "./Button";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    // backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  level: "primary",
  label: "Primary",
  corners: "squared",
  fullWidth: false,
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "Secondary",
  level: "secondary",
  corners: "squared",
  fullWidth: false,
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  label: "Tertiary",
  level: "tertiary",
  corners: "squared",
  fullWidth: false,
};
