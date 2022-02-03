import React, { useMemo } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Listbox from "./Listbox";
import { useForm } from "react-hook-form";

export default {
    title: "Components/Form Fields/Listbox",
    component: Listbox,
    argTypes: {
        // backgroundColor: { control: "color" },
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
                        <Listbox label="control-1">

                        </Listbox>
                    </form>
                </div>
            </div>
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    name: "name",
    floatLabel: true,
    autocomplete: "off",
};
