/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Editor from "@/components/editor/Editor";
import { useUserWorkspace } from "@/features/userWorkspaces/api/useUserWorkspace";
import { IProtocol } from "@/types/api.types";
import { HocuspocusProvider } from "@hocuspocus/provider";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export const ProtocolPage = () => {
  const { state: protocol }: { state: IProtocol } = useLocation();
  const { data } = useUserWorkspace();

  const provider = useMemo(() => {
    return new HocuspocusProvider({
      url: `ws://localhost:8081`,
      name: `protocol.${protocol.id}`,
      token: data?.colabToken,
    });
  }, [protocol.id, data?.colabToken]);

  return (
    <div className="h-full">
      {protocol.name}
      <div className="h-full py-4">
        <Editor provider={provider} />
      </div>
    </div>
  );
};
