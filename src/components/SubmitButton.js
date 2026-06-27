import { useStore } from "../store";
import { Play } from "lucide-react";
import toast from "react-hot-toast";
import "../assets/styles/submit.css";
import { MessageToast, PipelineToast } from "./Toasts";

// Backend endpoint for pipeline analysis
const API_URL = "http://localhost:8000/pipelines/parse";

// Shared styling for simple toast notifications
const TOAST_STYLE = {
  borderRadius: "10px",
  background: "#fff",
  color: "#1a1a1a",
  border: "1px solid #e2e8f0",
  fontSize: "14px",
  fontFamily: "inherit",
};

// Error/failure messages
const MESSAGES = {
  EMPTY_PIPELINE: "Add some nodes to the canvas first.",
  CONNECTION_ERROR: "Unable to connect to the server. Please try again later.",
  ANALYSIS_ERROR: "Unable to analyze the pipeline. Please try again.",
};

/**
 * Displays a custom toast that remains visible until dismissed.
 */
const showPersistentToast = (renderToast) =>
  toast.custom(renderToast, { duration: Infinity });

export const SubmitButton = () => {
  /**
   * Sends the current pipeline to the backend and displays
   * the analysis results in a custom toast.
   */
  const handleSubmit = async () => {
    const { nodes, edges } = useStore.getState();

    // Prevent sending an empty pipeline.
    if (nodes.length === 0) {
      showPersistentToast((t) => (
        <MessageToast t={t} message={MESSAGES.EMPTY_PIPELINE} />
      ));

      return;
    }

    // Show a loading notification while waiting for the backend.
    const loadingToastId = toast.loading("Analyzing pipeline...", {
      style: TOAST_STYLE,
    });

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodes, edges }),
      });

      // Treat non-2xx responses as failures.
      if (!response.ok) {
        throw new Error(`Backend error (${response.status})`);
      }

      const { num_nodes, num_edges, is_dag } = await response.json();

      // Replace the loading toast with the analysis results.
      toast.dismiss(loadingToastId);

      showPersistentToast((t) => (
        <PipelineToast
          t={t}
          num_nodes={num_nodes}
          num_edges={num_edges}
          is_dag={is_dag}
        />
      ));
    } catch (error) {
      toast.dismiss(loadingToastId);

      const message =
        error instanceof Error && error.message === "Failed to fetch"
          ? MESSAGES.CONNECTION_ERROR
          : MESSAGES.ANALYSIS_ERROR;

      showPersistentToast((t) => <MessageToast t={t} message={message} />);
    }
  };

  return (
    <div className="submit-container">
      <button
        className="submit-btn"
        onClick={handleSubmit}
        aria-label="Run pipeline analysis"
      >
        <Play size={14} fill="white" aria-hidden="true" />
        Run
      </button>
    </div>
  );
};
