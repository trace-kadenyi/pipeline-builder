import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const MergeNode = ({ id, data }) => {
  const [separator, setSeparator] = useState(data?.separator || " ");

  return (
    <BaseNode
      id={id}
      title="Merge"
      fields={[
        {
          name: "separator",
          label: "Separator",
          type: "text",
          value: separator,
          onChange: (e) => setSeparator(e.target.value),
          placeholder: "e.g. space, comma...",
        },
      ]}
      handles={[
        {
          id: "input1",
          type: "target",
          position: Position.Left,
          style: { top: "33%" },
        },
        {
          id: "input2",
          type: "target",
          position: Position.Left,
          style: { top: "67%" },
        },
        { id: "output", type: "source", position: Position.Right },
      ]}
    />
  );
};
