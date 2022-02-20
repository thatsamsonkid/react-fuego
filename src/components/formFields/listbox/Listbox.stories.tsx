import React, { useMemo } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Listbox } from "./Listbox";
import { useForm } from "react-hook-form";

export default {
  title: "Components/Form Fields/Listbox",
  component: Listbox,
  argTypes: {
    // backgroundColor: { control: "color" },
    fieldSize: {
      options: ["small", "regular"],
      control: { type: "radio" },
    },
  },
} as ComponentMeta<typeof Listbox>;

const Template: ComponentStory<typeof Listbox> = (args) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isDirty, isValid, errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <form>
            <Listbox label="Name" {...args}></Listbox>
          </form>
        </div>
      </div>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  name: "name",
  options: [
    { id: 1, label: "Cool", value: "cool" },
    { id: 2, label: "Dropdown", value: "dropdown" },
    { id: 3, label: "Bro", value: "bro" },
  ],
  onSelection: (e) => console.log(e),
  onChange: () => console.log("woo"),
};

export const Small = Template.bind({});
Small.args = {
  name: "name",
  options: [
    { id: 1, label: "Cool", value: "cool" },
    { id: 2, label: "Dropdown", value: "dropdown" },
    { id: 3, label: "Bro", value: "bro" },
  ],
  fieldSize: "small",
  onSelection: (e) => console.log(e),
  onChange: () => console.log("woo"),
};

export const Loading = Template.bind({});
Loading.args = {
  name: "name",
  loading: true,
  options: [
    { id: 1, label: "Cool", value: "cool" },
    { id: 2, label: "Dropdown", value: "dropdown" },
    { id: 3, label: "Bro", value: "bro" },
  ],
};
