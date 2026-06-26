import { Play } from "lucide-react";
import "./styles/submit.css";

export const SubmitButton = () => {
  return (
    <div className="submit-container">
      <button className="submit-btn">
        <Play size={14} fill="white" />
        Run
      </button>
    </div>
  );
};
