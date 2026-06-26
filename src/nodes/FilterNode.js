import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const FilterNode = ({ id, data }) => {
  const [operator, setOperator] = useState(data?.operator || "equals");
  const [value, setValue] = useState(data?.value || "");

  return (
    <BaseNode
      id={id}
      title="Filter"
      fields={[
        {
          name: "operator",
          label: "Condition",
          type: "select",
          value: operator,
          onChange: (e) => setOperator(e.target.value),
          options: ["equals", "contains", "starts with", "ends with"],
        },
        {
          name: "value",
          label: "Value",
          type: "text",
          value: value,
          onChange: (e) => setValue(e.target.value),
          placeholder: "Filter value...",
        },
      ]}
      handles={[
        { id: "input", type: "target", position: Position.Left },
        {
          id: "match",
          type: "source",
          position: Position.Right,
          style: { top: "33%" },
        },
        {
          id: "nomatch",
          type: "source",
          position: Position.Right,
          style: { top: "67%" },
        },
      ]}
    />
  );
};
