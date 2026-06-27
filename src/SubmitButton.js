import { useStore } from "./store";
import { Play } from "lucide-react";
import toast from "react-hot-toast";
import "./styles/submit.css";

// Shared style for simple toasts (error, loading)
const toastBaseStyle = {
  borderRadius: "10px",
  background: "#fff",
  color: "#1a1a1a",
  border: "1px solid #e2e8f0",
  fontSize: "14px",
  fontFamily: "inherit",
};

// Animates the toast card out then removes it
const dismissToast = (id) => {
  const el = document.getElementById(`toast-${id}`);
  if (el) {
    el.style.transition = "all 0.3s ease";
    el.style.opacity = "0";
    el.style.transform = "translateX(20px) scale(0.95)";
    setTimeout(() => toast.remove(id), 300);
  } else {
    toast.remove(id);
  }
};

// The custom toast card component
const PipelineToast = ({ t, num_nodes, num_edges, is_dag, duration }) => (
  <div className="toast-card" id={`toast-${t.id}`}>
    <div className="toast-header">
      <span className="toast-title">Pipeline Analysis</span>
      <div className="toast-title-line" />
    </div>

    <div className="toast-rows">
      <div className="toast-row">
        <span className="toast-label">Nodes</span>
        <span className="toast-value">{num_nodes}</span>
      </div>

      <div className="toast-row">
        <span className="toast-label">Edges</span>
        <span className="toast-value">{num_edges}</span>
      </div>

      <div className="toast-divider">
        <span className="toast-label">Valid DAG</span>
        <span className={is_dag ? "toast-dag-yes" : "toast-dag-no"}>
          {is_dag ? "Yes ✓" : "No ✗"}
        </span>
      </div>
    </div>

    <div className="toast-footer">
      <button className="toast-close-btn" onClick={() => dismissToast(t.id)}>
        Close
      </button>
    </div>
  </div>
);

export const SubmitButton = () => {
  // handle submit
  const handleSubmit = async () => {
    const { nodes, edges } = useStore.getState();

    if (nodes.length === 0) {
      toast.error("Add some nodes to the canvas first!", {
        style: toastBaseStyle,
      });
      return;
    }

    const loadingToast = toast.loading("Analyzing pipeline...", {
      style: toastBaseStyle,
    });
    const start = performance.now();

    try {
      const res = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!res.ok) throw new Error("Backend error");

      const { num_nodes, num_edges, is_dag } = await res.json();
      const duration = ((performance.now() - start) / 1000).toFixed(2);

      toast.dismiss(loadingToast);
      toast.custom(
        (t) => (
          <PipelineToast
            t={t}
            num_nodes={num_nodes}
            num_edges={num_edges}
            is_dag={is_dag}
            duration={duration}
          />
        ),
        { duration: Infinity },
      );
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("Could not reach the backend. Is it running?", {
        style: toastBaseStyle,
      });
    }
  };

  return (
    <div className="submit-container">
      <button className="submit-btn" onClick={handleSubmit}>
        <Play size={14} fill="white" />
        Run
      </button>
    </div>
  );
};
