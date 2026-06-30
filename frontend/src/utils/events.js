// Name of the event fired whenever the pipeline structure changes.
export const PIPELINE_CHANGED_EVENT = "pipelineChanged";

/**
 * Notifies listeners that the pipeline structure has changed.
 */
export const notifyPipelineChanged = () => {
  window.dispatchEvent(new Event(PIPELINE_CHANGED_EVENT));
};
