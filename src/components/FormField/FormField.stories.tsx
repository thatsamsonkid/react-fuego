import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Field from "./Field";

export default {
  title: "Components/Form Fields",
  component: Field,
  argTypes: {
    // backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Field>;

const Template: ComponentStory<typeof Field> = (args) => <Field {...args} />;

export const TextField = Template.bind({});
TextField.args = {};
