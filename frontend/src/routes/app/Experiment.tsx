/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Editor from "@/features/editor/components/Editor";
import { IExperiment } from "@/types/api.types";
import { HocuspocusProvider } from "@hocuspocus/provider";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export const ExperimentPage = () => {
  const { state: experiment }: { state: IExperiment } = useLocation();

  const provider = useMemo(() => {
    return new HocuspocusProvider({
      url: `ws://localhost:8081`,
      name: experiment.id,

      // document: new Y.Doc(),
      // onOpen: () => {
      //   console.log("WebSocket connection opened.");
      // },
      // onConnect: () => {
      //   console.log("Connected to WebSocket server.");
      // },
      // onStatus({ status }) {
      //   // if (status === WebSocketStatus.Connected) {

      //   // }
      //   console.log(status);
      // },
      // onSynced() {
      //   console.log("synced");
      // },
      // onMessage(data) {
      //   console.log(data);
      // },
    });
  }, [experiment.id]);

  return (
    <div className="h-full">
      {experiment.name}
      <div className="h-full py-4">
        <Editor provider={provider} />
      </div>
    </div>
  );
};
