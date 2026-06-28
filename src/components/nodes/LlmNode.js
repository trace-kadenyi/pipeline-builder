// LLMNode — represents a large language model call in the pipeline.
// Accepts two inputs: a system prompt and a user prompt.
// Produces one output: the model's response.
// Has no editable fields — configuration happens via connected nodes.

import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      fields={[]}
      handles={[
        {
          id: "system",
          type: "target",
          position: Position.Left,
          style: { top: "33%" },
        },
        {
          id: "prompt",
          type: "target",
          position: Position.Left,
          style: { top: "67%" },
        },
        { id: "response", type: "source", position: Position.Right },
      ]}
    >
      <p style={{ fontSize: "12px", color: "#666" }}>
        Connect a system prompt and user prompt to generate a response.
      </p>
    </BaseNode>
  );
};
