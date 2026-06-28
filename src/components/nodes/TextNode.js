// TextNode — a dynamic text template node.
// Supports {{variable}} syntax to create input handles on the fly.
// Auto-resizes in width and height as the user types.
// Each detected variable gets its own target handle on the left.

import { useState, useRef, useEffect, useLayoutEffect, useMemo } from "react";
import { Position, useUpdateNodeInternals } from "reactflow";
import { BaseNode } from "./BaseNode";

export const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

// Pure function — takes text, returns array of unique variable names found
export function extractVariables(text) {
  const names = [];
  let match;
  while ((match = VARIABLE_REGEX.exec(text)) !== null) {
    if (!names.includes(match[1])) names.push(match[1]);
  }
  return names;
}

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text ?? "{{input}}");
  const [handleTops, setHandleTops] = useState({});

  // Refs for DOM elements
  const textareaRef = useRef(null);
  const nodeRef = useRef(null);
  const rowRefs = useRef({});

  // Hook to trigger React Flow's internal updates when handle positions change
  const updateNodeInternals = useUpdateNodeInternals();

  // Extract variables from text for handle generation
  const variables = useMemo(() => extractVariables(currText), [currText]);

  /**
   * Calculate dynamic node width based on text content
   * Width adjusts between 220px and 420px based on the longest line length
   * Each character is estimated at 8px width with 40px padding
   */
  const nodeWidth = useMemo(() => {
    const MIN = 220;
    const MAX = 420;
    const CHAR = 8;
    const longest = currText
      .split("\n")
      .reduce((m, l) => Math.max(m, l.length), 0);
    return Math.min(MAX, Math.max(MIN, longest * CHAR + 40));
  }, [currText]);

  // Auto-resize textarea height to fit content
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [currText]);

  /**
   * Calculate vertical positions for variable handles
   * This runs after layout changes to get accurate DOM measurements
   * Aligns handles with the center of each variable display row
   */
  useLayoutEffect(() => {
    const nodeEl = nodeRef.current;
    if (!nodeEl) return;

    const nodeRect = nodeEl.getBoundingClientRect();
    const tops = {};

    variables.forEach((name) => {
      const row = rowRefs.current[name];
      if (!row) return;
      const rowRect = row.getBoundingClientRect();
      tops[name] = rowRect.top - nodeRect.top + rowRect.height / 2;
    });

    setHandleTops(tops);
    updateNodeInternals(id);
  }, [variables, currText, nodeWidth, id, updateNodeInternals]);

  // Build handles: one input per variable, one output
  const handles = useMemo(
    () => [
      ...variables.map((name) => ({
        id: name,
        type: "target",
        position: Position.Left,
        style:
          handleTops[name] != null
            ? { top: handleTops[name], transform: "translateY(-50%)" }
            : undefined,
      })),
      { id: "output", type: "source", position: Position.Right },
    ],
    [variables, handleTops],
  );

  return (
    <BaseNode
      ref={nodeRef}
      id={id}
      title="Text"
      className="text-node"
      style={{ width: nodeWidth }}
      fields={[
        {
          name: "text",
          label: "Text",
          type: "textarea",
          value: currText,
          onChange: (e) => setCurrText(e.target.value),
          placeholder: "Type '{{' to utilize variables...",
          rows: 1,
          inputRef: textareaRef,
        },
      ]}
      handles={handles}
    >
      {variables.length > 0 && (
        <div className="text-node-inputs">
          <span className="field-label">Variables</span>
          <div className="text-node-input-list">
            {variables.map((name) => (
              <div
                key={name}
                ref={(el) => {
                  rowRefs.current[name] = el;
                }}
                className="text-node-input-row"
              >
                <span className="text-node-var-bracket">{"{{"}</span>
                <span className="text-node-var-name">{name}</span>
                <span className="text-node-var-bracket">{"}}"}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </BaseNode>
  );
};
