# pipeline-builder

A visual pipeline builder with a reusable node abstraction, dynamic variable handles, and DAG validation — built with React, ReactFlow, and FastAPI.

Drag, drop, and connect nodes on a canvas to visually represent a data pipeline. Run the pipeline to validate its structure — node count, edge count, and whether it forms a valid Directed Acyclic Graph (DAG).

## Features

- **9 node types** — Input, Output, LLM, Text, Filter, Transform, API Call, Merge, and Note — all built on a single shared `BaseNode` abstraction
- **Dynamic variable handles** — type `{{variableName}}` in a Text node and a new connection handle is generated automatically, positioned precisely against its label
- **Auto-resizing nodes** — the Text node grows in width and height as content is typed
- **Pipeline validation** — a FastAPI backend checks the pipeline for cycles using Kahn's algorithm and returns node/edge counts
- **Polished UI** — custom persistent toast notifications with animated transitions, race-condition prevention, and automatic dismissal when the pipeline changes
- **Tested** — 7 pytest tests for the DAG algorithm, 7 Jest tests for variable extraction logic

## Tech Stack

**Frontend:** React, ReactFlow, Zustand, react-hot-toast, lucide-react
**Backend:** FastAPI, Pydantic
**Testing:** Jest, pytest

## Getting Started

### Frontend

\`\`\`bash
cd frontend
npm install
npm start
\`\`\`

Runs on `http://localhost:3000`

### Backend

\`\`\`bash
cd backend
pip3 install fastapi uvicorn pytest
uvicorn main:app --reload
\`\`\`

Runs on `http://localhost:8000`

## Running Tests

**Backend**
\`\`\`bash
cd backend
python3 -m pytest test_main.py -v
\`\`\`

**Frontend**
\`\`\`bash
cd frontend
npm test
\`\`\`

## Architecture Notes

### Node Abstraction

All nodes are built on a single `BaseNode` component that handles layout, field rendering, and ReactFlow handle placement. Individual nodes pass in a config — `title`, `fields`, and `handles` — rather than duplicating markup. A `FieldRenderer` subcomponent renders the correct input type (text, select, or textarea) based on field configuration.

### Dynamic Variable Handles

The Text node scans its content for `{{variableName}}` patterns using a regex, extracts unique variable names, then uses `useLayoutEffect` to measure the exact DOM position of each variable's display row. Those measurements position the corresponding ReactFlow handle precisely, and `updateNodeInternals` keeps ReactFlow's internal edge rendering in sync.

### DAG Validation

The backend implements Kahn's algorithm (topological sort via in-degree tracking) to detect cycles in the pipeline graph. A pipeline with circular connections fails validation; everything else passes.

## License

Personal project, built as part of a technical assessment.