import MenuBar from "./MenuBar";
import { EditorContent, useEditor } from "@tiptap/react";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import type { HocuspocusProvider } from "@hocuspocus/provider";
import Extensions from "./Extensions";
import { useUserWorkspace } from "@/features/userWorkspaces/api/useUserWorkspace";

interface IEditorProps {
  provider: HocuspocusProvider;
}

const Editor = ({ provider }: IEditorProps) => {
  const { data } = useUserWorkspace();

  const editor = useEditor({
    extensions: [
      ...Extensions,
      Collaboration.configure({
        document: provider.document,
      }),
      CollaborationCursor.configure({
        provider,
        user: { name: `${data?.user.name}`, color: "#ffcc00" },
      }),
    ],
    shouldRerenderOnTransaction: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg p-5 min-w-full min-h-full focus:outline-none",
      },
    },
  });

  return (
    <div className="relative flex h-full flex-1 flex-col overflow-hidden rounded-lg border-[2.5px] border-indigo-600 bg-white text-gray-700 shadow-md">
      {editor && <MenuBar editor={editor} />}
      <EditorContent editor={editor} className="flex-1 overflow-y-scroll" />
    </div>
  );
};

export default Editor;
