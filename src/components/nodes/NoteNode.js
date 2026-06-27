import { useState } from "react";
import { BaseNode } from "./BaseNode";

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || "");

  return (
    <BaseNode
      id={id}
      title="Note"
      fields={[
        {
          name: "note",
          label: "",
          type: "textarea",
          value: note,
          onChange: (e) => setNote(e.target.value),
          placeholder: "Add a comment or annotation...",
        },
      ]}
      handles={[]}
      style={{ background: "#fefce8", borderColor: "#fde047" }}
    />
  );
};
