import "./todoItem.css";
import { Checkbox, TextInput, Divider } from "@mantine/core";
import React, { ChangeEvent, useRef, useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { debounce } from "../../utils/generalUtils";

export type TodoItemProps = {
  isCompleted: boolean;
  content: string;
};

type TodoActions = {
  onDelete: (index: number) => void;
  onUpdate: (index: number, check: boolean, content: string) => void;
  index: number;
};

type InputActions = {
  onFocus: () => void;
  onBlur: () => void;
};

function TodoItem({
  isCompleted,
  content,
  index,
  onDelete,
  onUpdate,
  onFocus,
  onBlur,
}: TodoItemProps & TodoActions & InputActions) {
  const [checked, setChecked] = useState(isCompleted);
  const [value, setValue] = useState(content);

  const debouncedUpdate = useRef(debounce(onUpdate, 200)).current;

  const handleUpdate = (
    event: ChangeEvent<HTMLInputElement>,
    actionType: "checkbox" | "input"
  ) => {
    console.log("handle update");
    const currentTarget = event.currentTarget;
    switch (actionType) {
      case "checkbox":
        setChecked(currentTarget.checked);
        break;
      case "input":
        setValue(currentTarget.value);
        break;
    }
    debouncedUpdate(index, currentTarget.checked, currentTarget.value);
  };
  return (
    <div className="todo-item-container">
      <div className="row-container-space-between" onFocus={onFocus}>
        <div className="row-container">
          <Checkbox
            classNames={{
              input: "round-checkbox",
            }}
            checked={checked}
            onChange={(event) => handleUpdate(event, "checkbox")}
            icon={() => null}
          />
          <TextInput
            value={value}
            onChange={(event) => handleUpdate(event, "input")}
            placeholder="put your content here"
            classNames={{ input: "no-border-input" }}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </div>
        <div>
          <TiDeleteOutline
            size={24}
            color="red"
            onClick={() => onDelete(index)}
          />
        </div>
      </div>
      <div className="divider-root" />
    </div>
  );
}

export default TodoItem;
