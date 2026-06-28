// OutputNode — terminal point of the pipeline.
// Accepts a name and type (Text or Image).
// Has one target handle on the left — receives data only.

import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_"),
  );
  const [outputType, setOutputType] = useState(data?.outputType || "Text");

  return (
    <BaseNode
      id={id}
      title="Output"
      fields={[
        {
          name: "outputName",
          label: "Name",
          type: "text",
          value: currName,
          onChange: (e) => setCurrName(e.target.value),
        },
        {
          name: "outputType",
          label: "Type",
          type: "select",
          value: outputType,
          onChange: (e) => setOutputType(e.target.value),
          options: ["Text", "Image"],
        },
      ]}
      handles={[{ id: "value", type: "target", position: Position.Left }]}
    />
  );
};
