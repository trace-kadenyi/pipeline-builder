import { forwardRef } from "react";
import { Handle } from "reactflow";
import "../styles/nodes.css";

export const BaseNode = forwardRef(function BaseNode(
  {
    id,
    title,
    fields = [],
    handles = [],
    children,
    style = {},
    className = "",
  },
  ref,
) {
  return (
    <div
      ref={ref}
      className={`base-node${className ? ` ${className}` : ""}`}
      style={style}
    >
      <div className="base-node-header">
        <span className="base-node-title">{title}</span>
      </div>

      <div className="base-node-body">
        {fields.map((field) => (
          <FieldRenderer key={field.name} field={field} />
        ))}
        {children}
      </div>

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
});

const FieldRenderer = ({ field }) => {
  const {
    label,
    type,
    value,
    onChange,
    options = [],
    placeholder = "",
    rows = 3,
    inputRef,
  } = field;

  return (
    <label className="base-node-field">
      {label && <span className="field-label">{label}</span>}
      {type === "select" ? (
        <select className="field-input" value={value} onChange={onChange}>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          ref={inputRef}
          className="field-input field-textarea"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
        />
      ) : (
        <input
          ref={inputRef}
          className="field-input"
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </label>
  );
};
