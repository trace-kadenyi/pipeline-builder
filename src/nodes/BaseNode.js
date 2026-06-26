import { Handle, Position } from "reactflow";

export const BaseNode = ({
  id,
  title,
  fields = [],
  handles = [],
  children,
}) => {
  return (
    <div
      style={{
        width: 200,
        border: "1px solid black",
        padding: "10px",
        borderRadius: "4px",
        background: "white",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "8px", fontWeight: "bold" }}>
        <span>{title}</span>
      </div>

      {/* Fields */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {fields.map((field) => (
          <FieldRenderer key={field.name} field={field} />
        ))}
        {children}
      </div>

      {/* Handles */}
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={`${id}-${handle.id}`}
          style={handle.style}
        />
      ))}
    </div>
  );
};

const FieldRenderer = ({ field }) => {
  const {
    label,
    type,
    value,
    onChange,
    options = [],
    placeholder = "",
  } = field;

  return (
    <label
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2px",
        fontSize: "13px",
      }}
    >
      {label && <span>{label}</span>}
      {type === "select" ? (
        <select value={value} onChange={onChange}>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={3}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </label>
  );
};
