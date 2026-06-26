import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  return (
    <BaseNode
      id={id}
      title="Text"
      fields={[
        {
          name: 'text',
          label: 'Text',
          type: 'textarea',
          value: currText,
          onChange: (e) => setCurrText(e.target.value),
          placeholder: 'Enter text or use {{variable}} to create inputs...',
        },
      ]}
      handles={[
        { id: 'output', type: 'source', position: Position.Right },
      ]}
    />
  );
};