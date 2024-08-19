/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useAuth } from "@/features/auth/api/useAuth";
import Editor from "@/features/editor/components/Editor";
import { IProtocol } from "@/types/api.types";
import { HocuspocusProvider } from "@hocuspocus/provider";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export const ProtocolPage = () => {
  const { state: protocol }: { state: IProtocol } = useLocation();
  const { data } = useAuth();

  const provider = useMemo(() => {
    return new HocuspocusProvider({
      url: `ws://localhost:8081`,
      name: protocol.id,
      token: data?.accessToken,
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
  }, [protocol.id, data?.accessToken]);

  return (
    <div className="h-full">
      {protocol.name}
      <div className="h-full py-4">
        <Editor provider={provider} />
      </div>
    </div>
  );
};
