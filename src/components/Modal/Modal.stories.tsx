import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Modal from "./Modal";

export default {
  title: "Components/Modal",
  component: Modal,
  argTypes: {
    // backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => (
  <>
    <Modal {...args} />
  </>
);

export const ModalCmp = Template.bind({});
ModalCmp.args = {
  isShowing: true,
  children: (
    <>
      <h1>WOOW</h1>
      <p>dmksdmlksa</p>
      <button>COol</button>
    </>
  ),
};

export const FullscreenModalCmp = Template.bind({});
FullscreenModalCmp.args = {
  isShowing: true,
  fullscreen: true,
  children: (
    <>
      <h1>WOOW</h1>
      <p>dmksdmlksa</p>
      <button>COol</button>
    </>
  ),
};
