import { DraggableNode } from "./DraggableNode";
import "../assets/styles/toolbar.css";

export const PipelineToolbar = () => {
  return (
    <div className="toolbar">
      <span className="toolbar-label">Nodes</span>
      <DraggableNode type="customInput" label="Input" />
      <DraggableNode type="llm" label="LLM" />
      <DraggableNode type="customOutput" label="Output" />
      <DraggableNode type="text" label="Text" />
      <DraggableNode type="filter" label="Filter" />
      <DraggableNode type="transform" label="Transform" />
      <DraggableNode type="api" label="API Call" />
      <DraggableNode type="merge" label="Merge" />
      <DraggableNode type="note" label="Note" />
    </div>
  );
};
