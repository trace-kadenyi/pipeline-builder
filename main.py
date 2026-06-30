from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Any
from collections import deque, defaultdict

app = FastAPI()

# Enable CORS so frontend (localhost:3000) can communicate with this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class Pipeline(BaseModel):
    """Expected request body shape from frontend"""

    nodes: List[Any]
    edges: List[Any]


def is_dag(nodes, edges) -> bool:
    """
    Kahn's algorithm: returns True if graph has no cycles.
    Nodes with zero incoming edges get processed first.
    If we can't process all nodes, there's a cycle.
    """
    # Map each node ID to its list of outgoing neighbours
    graph = defaultdict(list)
    in_degree = {node["id"]: 0 for node in nodes}

    # Build graph and count incoming edges
    for edge in edges:
        src, tgt = edge["source"], edge["target"]
        if src in in_degree and tgt in in_degree:
            graph[src].append(tgt)
            in_degree[tgt] += 1

    # Start with nodes that have no dependencies
    queue = deque([nid for nid, deg in in_degree.items() if deg == 0])
    processed = 0

    # Process nodes in order, removing edges as we go
    while queue:
        node = queue.popleft()
        processed += 1
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    # If all nodes were processed → no cycles → it's a DAG
    return processed == len(in_degree)


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    """Receive pipeline data, count nodes/edges, and validate DAG"""
    try:
        return {
            "num_nodes": len(pipeline.nodes),
            "num_edges": len(pipeline.edges),
            "is_dag": is_dag(pipeline.nodes, pipeline.edges),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
