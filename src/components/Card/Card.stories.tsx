import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Card } from "./Card";

export default {
  title: "Components/Card",
  component: Card,
  argTypes: {
    // backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  level: "primary",
  children: <p>Geekin LAWL</p>,
};

export const Secondary = Template.bind({});
Secondary.args = {
  level: "secondary",
  children: <p>Geekin LAWL</p>,
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  level: "tertiary",
  children: <p>Geekin LAWL</p>,
};
