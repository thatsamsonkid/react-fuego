import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import TextImage from "./TextImage";

export default {
  title: "Components/TextImage",
  component: TextImage,
  argTypes: {
    // backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof TextImage>;

const Template: ComponentStory<typeof TextImage> = (args) => (
  <TextImage {...args} />
);

export const TitleImage = Template.bind({});
TitleImage.args = {
  title: "My Beautiful Title",
  img: "https://source.unsplash.com/random/?city,night",
  imgAlt: "Beautiful Night Shot of City",
  orderReverse: false,
};

export const TitleTextImage = Template.bind({});
TitleTextImage.args = {
  title: "My Beautiful Title",
  img: "https://source.unsplash.com/random/?city,night",
  imgAlt: "Beautiful Night Shot of City",
  orderReverse: false,
  children: (
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </p>
  ),
};
