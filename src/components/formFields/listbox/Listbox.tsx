import React, { forwardRef, useMemo, useState } from "react";
import { Field } from "../field/Field";

interface IListbox {
  id?: string;
  label: string;
  children?: any;
  autocomplete?: any;
}

const generateFieldKey = (() => {
  let count = 0;
  return () => `Listbox-${++count}`;
})();

const Listbox = forwardRef(({ label = "", children = null, autocomplete = false }: IListbox,
  ref: any) => {
  const id = useMemo(generateFieldKey, []);
  const labelId = `${id}-label`;
  const listId = `${id}-list`;

  const [expanded, setexpanded] = useState(false);
  const [suggestions, setSuggestions] = useState([{ label: "Cool", value: "cool" }, { label: "Dropdown", value: "dropdown" }, { label: "Bro", value: "bro" }]);

  // Have an option for static options and also a function to pass and format suggestions
  return (
    <div role="combobox"
      aria-expanded={expanded}
      aria-owns={listId}
      aria-haspopup="listbox"
      id={id}>
      <Field ref={ref} id={id} labelId={labelId} floatLabel={false}>{label}</Field>
      <div className="combobox-wrapper">
        <ul aria-labelledby={labelId}
          role="listbox"
          id={listId}
          className="listbox">
          {suggestions.map(({ label, value }) => {
            return <li onClick={() => console.log({ label, value })}>{label}</li>
          })}
        </ul>
      </div>
    </div>
  );
});

export default Listbox;
