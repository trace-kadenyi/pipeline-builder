// TransformNode — applies a string operation to its input.
// Operations include: Uppercase, Lowercase, Trim, Reverse, JSON Parse/Stringify.
// Simple 1-in 1-out node.

import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const TransformNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || "Uppercase");

  return (
    <BaseNode
      id={id}
      title="Transform"
      fields={[
        {
          name: "operation",
          label: "Operation",
          type: "select",
          value: operation,
          onChange: (e) => setOperation(e.target.value),
          options: [
            "Uppercase",
            "Lowercase",
            "Trim",
            "Reverse",
            "JSON Parse",
            "JSON Stringify",
          ],
        },
      ]}
      handles={[
        { id: "input", type: "target", position: Position.Left },
        { id: "output", type: "source", position: Position.Right },
      ]}
    />
  );
};
