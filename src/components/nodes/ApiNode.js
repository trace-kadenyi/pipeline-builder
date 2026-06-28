// APINode — represents an external HTTP request in the pipeline.
// Accepts a method and URL.
// Has two outputs: Response (success) and Error (failure).

import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const APINode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || "GET");
  const [url, setUrl] = useState(data?.url || "");

  return (
    <BaseNode
      id={id}
      title="API Call"
      fields={[
        {
          name: "method",
          label: "Method",
          type: "select",
          value: method,
          onChange: (e) => setMethod(e.target.value),
          options: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        },
        {
          name: "url",
          label: "URL",
          type: "text",
          value: url,
          onChange: (e) => setUrl(e.target.value),
          placeholder: "https://api.example.com/endpoint",
        },
      ]}
      handles={[
        { id: "body", type: "target", position: Position.Left },
        {
          id: "response",
          type: "source",
          position: Position.Right,
          style: { top: "33%" },
        },
        {
          id: "error",
          type: "source",
          position: Position.Right,
          style: { top: "67%" },
        },
      ]}
    />
  );
};
