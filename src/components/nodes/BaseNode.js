/**
 * BaseNode — the shared template for all pipeline nodes.
 *
 * Instead of each node managing its own layout, handles, and fields,
 * they all delegate that responsibility here. A node only needs to
 * describe what makes it unique (title, fields, handles) and BaseNode
 * handles the rendering.
 *
 * forwardRef is used so parent components (like TextNode) can attach
 * a ref to the outer div for DOM measurement purposes.
 */

import { forwardRef } from "react";
import { Handle } from "reactflow";
import "../../assets/styles/nodes.css";

export const BaseNode = forwardRef(function BaseNode(
  {
    id,
    title,
    fields = [], // array of field configs to render in the body
    handles = [], // array of handle configs for connection points
    children, // optional custom content below fields
    style = {}, // optional style overrides for the outer wrapper
    className = "", // optional extra class names
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
        {/* Render each field using FieldRenderer based on its type */}
        {fields.map((field) => (
          <FieldRenderer key={field.name} field={field} />
        ))}
        {/* Any custom JSX passed as children renders here */}
        {children}
      </div>

      {/* Render ReactFlow connection handles — prefixed with node id to ensure uniqueness */}
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

/**
 * FieldRenderer — renders the correct input element based on field.type.
 *
 * Accepts: 'select', 'textarea', or defaults to 'text' input.
 * inputRef is forwarded to the DOM element for cases where the parent
 * needs direct access (e.g. TextNode measuring textarea height).
 */
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
