from main import is_dag

# Helper to build nodes and edges in the format our function expects
def make_nodes(*ids):
    return [{"id": id} for id in ids]

def make_edges(*pairs):
    return [{"source": src, "target": tgt} for src, tgt in pairs]


# Single node, no edges — valid DAG
def test_single_node():
    nodes = make_nodes("a")
    edges = make_edges()
    assert is_dag(nodes, edges) == True

# Empty pipeline — valid DAG
def test_empty_pipeline():
    nodes = make_nodes()
    edges = make_edges()
    assert is_dag(nodes, edges) == True

# Linear pipeline A→B→C — valid DAG
def test_linear_pipeline():
    nodes = make_nodes("a", "b", "c")
    edges = make_edges(("a", "b"), ("b", "c"))
    assert is_dag(nodes, edges) == True

# Disconnected nodes, no edges — valid DAG
def test_disconnected_nodes():
    nodes = make_nodes("a", "b", "c")
    edges = make_edges()
    assert is_dag(nodes, edges) == True

# Direct cycle A→B→A — not a DAG
def test_direct_cycle():
    nodes = make_nodes("a", "b")
    edges = make_edges(("a", "b"), ("b", "a"))
    assert is_dag(nodes, edges) == False

# Three node cycle A→B→C→A — not a DAG
def test_three_node_cycle():
    nodes = make_nodes("a", "b", "c")
    edges = make_edges(("a", "b"), ("b", "c"), ("c", "a"))
    assert is_dag(nodes, edges) == False

# Branching pipeline — valid DAG
#     a
#    / \
#   b   c
#    \ /
#     d
def test_branching_pipeline():
    nodes = make_nodes("a", "b", "c", "d")
    edges = make_edges(("a", "b"), ("a", "c"), ("b", "d"), ("c", "d"))
    assert is_dag(nodes, edges) == True