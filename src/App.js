import { Toaster } from "react-hot-toast";
import { PipelineToolbar } from "./components/PipelineToolbar";
import { PipelineUI } from "./components/PipelineUI";
import { SubmitButton } from "./components/SubmitButton";

function App() {
  return (
    <div>
      <Toaster
        position="top-right"
        toastOptions={{
          custom: {
            duration: Infinity,
          },
        }}
        containerStyle={{
          top: 24,
          right: 24,
        }}
      />
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;
