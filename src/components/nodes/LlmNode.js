import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      fields={[]}
      handles={[
        { id: 'system', type: 'target', position: Position.Left, style: { top: '33%' } },
        { id: 'prompt', type: 'target', position: Position.Left, style: { top: '67%' } },
        { id: 'response', type: 'source', position: Position.Right },
      ]}
    >
      <p style={{ fontSize: '12px', color: '#666' }}>
        Connect a system prompt and user prompt to generate a response.
      </p>
    </BaseNode>
  );
};