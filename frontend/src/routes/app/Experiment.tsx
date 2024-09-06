/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { IExperiment } from "@/types/api.types";
import { useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { useState, useEffect, useMemo } from "react";
import {
  HocuspocusProvider,
  HocuspocusProviderWebsocket,
} from "@hocuspocus/provider";
import Editor from "@/components/editor/Editor";
import { useUserWorkspace } from "@/features/userWorkspaces/api/useUserWorkspace";

export const ExperimentPage = () => {
  const { state: experiment }: { state: IExperiment } = useLocation();
  const { data } = useUserWorkspace();

  const [websocketProvider, setWebsocketProvider] =
    useState<HocuspocusProviderWebsocket | null>(null);

  useEffect(() => {
    const websocket = new HocuspocusProviderWebsocket({
      url: `ws://localhost:8081`,
    });

    setWebsocketProvider(websocket);
  }, []);

  const protocolProvider = useMemo(() => {
    if (!websocketProvider) return;

    return new HocuspocusProvider({
      websocketProvider,
      name: `experiment.protocol.${experiment.id}`,
      token: data?.colabToken,
    });
  }, [experiment.id, websocketProvider, data?.colabToken]);

  const notesProvider = useMemo(() => {
    if (!websocketProvider) return;

    return new HocuspocusProvider({
      websocketProvider,
      name: `experiment.notes.${experiment.id}`,
      token: data?.colabToken,
    });
  }, [experiment.id, websocketProvider, data?.colabToken]);

  return (
    <>
      <Tabs defaultValue="protocol" className="h-full py-4">
        <TabsList>
          <TabsTrigger value="protocol">Protocol</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="attachments">Attachments</TabsTrigger>
        </TabsList>
        <TabsContent className="h-full pb-6" value="protocol">
          {protocolProvider && <Editor provider={protocolProvider} />}
        </TabsContent>
        <TabsContent className="h-full pb-6" value="notes">
          {notesProvider && <Editor provider={notesProvider} />}
        </TabsContent>
        <TabsContent className="h-full py-4" value="attachments">
          Attachments
        </TabsContent>
      </Tabs>
    </>
  );
};
