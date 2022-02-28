import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Tabs } from "./Tabs";
import { Tab } from "./Tab";

export default {
  title: "Components/Tabs",
  component: Tabs,
  argTypes: {
    // backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => (
  <Tabs {...args}>
    <Tab label="tab1">
      <div><p>Tab 1</p></div>
    </Tab>
    <Tab label="tab2">
      <div><p>Tab 2</p></div>
    </Tab>
  </Tabs>
);

export const Default = Template.bind({});
Default.args = {};

// export const Secondary = Template.bind({});
// Secondary.args = {
//   options: options,
// };

// export const Tertiary = Template.bind({});
// Tertiary.args = {
//   options: options,
// };
