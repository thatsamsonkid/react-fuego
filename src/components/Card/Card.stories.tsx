import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Card from "./Card";

export default {
  title: "Components/Card",
  component: Card,
  argTypes: {
    // backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const BasicCard = Template.bind({});
BasicCard.args = {
  children: <p>Geekin LAWL</p>,
};
