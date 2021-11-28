import React, { useMemo } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Field } from "./Field";
import { useForm } from "react-hook-form";

export default {
  title: "Components/Form Fields",
  component: Field,
  argTypes: {
    // backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Field>;

const Template: ComponentStory<typeof Field> = (args) => {
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
            <Field
              {...args}
              {...register("name", {
                required: true,
                pattern: /[A-Za-z]{2}$/i,
              })}
              fieldErrors={errors.name ? true : false}
              errorLabel={errors.name && "Valid email is required!"}
            >
              Name
            </Field>
          </form>
        </div>
      </div>
    </div>
  );
};

export const TextField = Template.bind({});
TextField.args = {
  name: "name",
  floatLabel: true,
  autocomplete: "off",
};

export const TextArea = Template.bind({});
TextArea.args = {
  name: "name",
  floatLabel: true,
  autocomplete: "off",
  type: "textarea",
};
