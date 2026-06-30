// InputNode — entry point for data into the pipeline.
// Accepts a name and type (Text or File).
// Has one source handle on the right — data flows out only.

import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_"),
  );
  const [inputType, setInputType] = useState(data?.inputType || "Text");

  return (
    <BaseNode
      id={id}
      title="Input"
      fields={[
        {
          name: "inputName",
          label: "Name",
          type: "text",
          value: currName,
          onChange: (e) => setCurrName(e.target.value),
        },
        {
          name: "inputType",
          label: "Type",
          type: "select",
          value: inputType,
          onChange: (e) => setInputType(e.target.value),
          options: ["Text", "File"],
        },
      ]}
      handles={[{ id: "value", type: "source", position: Position.Right }]}
    />
  );
};
