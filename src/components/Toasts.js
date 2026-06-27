import toast from "react-hot-toast";
import { AlertTriangle } from "lucide-react";

// Duration (ms) for the toast exit animation
const TOAST_EXIT_DURATION = 300;

/**
 * Smoothly animates a custom toast before removing it.
 */
const dismissToast = (id) => {
  const toastElement = document.getElementById(`toast-${id}`);

  // Remove immediately if the toast has already unmounted.
  if (!toastElement) {
    toast.remove(id);
    return;
  }

  toastElement.style.transition = `
  opacity ${TOAST_EXIT_DURATION}ms ease,
  transform ${TOAST_EXIT_DURATION}ms ease
`;
  toastElement.style.opacity = "0";
  toastElement.style.transform = "translateX(20px) scale(0.95)";

  setTimeout(() => toast.remove(id), TOAST_EXIT_DURATION);
};

/**
 * Custom toast shown after a successful pipeline analysis.
 */
export const PipelineToast = ({ t, num_nodes, num_edges, is_dag }) => (
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
      <button
        className="toast-close-btn"
        onClick={() => dismissToast(t.id)}
        aria-label="Close notification"
      >
        Close
      </button>
    </div>
  </div>
);

/**
 * Reusable toast for validation and error messages.
 */
export const MessageToast = ({ t, message }) => (
  <div className="message-toast" id={`toast-${t.id}`}>
    <div className="message-toast-body">
      <div className="message-toast-icon">
        <AlertTriangle size={22} strokeWidth={2.25} />
      </div>

      <p className="message-toast-text">{message}</p>
    </div>

    <div className="message-toast-footer">
      <button
        className="message-toast-close-btn"
        onClick={() => dismissToast(t.id)}
        aria-label="Close notification"
      >
        Close
      </button>
    </div>
  </div>
);
