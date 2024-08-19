import MenuBar from "./MenuBar";
import { EditorContent, useEditor } from "@tiptap/react";
import extensions from "./extensions";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import type { HocuspocusProvider } from "@hocuspocus/provider";

interface IEditorProps {
  provider: HocuspocusProvider;
}

const Editor = ({ provider }: IEditorProps) => {
  const editor = useEditor({
    extensions: [
      ...extensions,
      Collaboration.configure({
        document: provider.document,
      }),
      CollaborationCursor.configure({
        provider,
        user: { name: "Matthew Hensen", color: "#ffcc00" },
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

  console.log(editor?.getJSON());

  return (
    <div className="relative flex h-full flex-1 flex-col overflow-hidden rounded-lg border-[2.5px] border-indigo-600 bg-white text-gray-700 shadow-md">
      {editor && <MenuBar editor={editor} />}
      <EditorContent editor={editor} className="flex-1 overflow-y-scroll" />
    </div>
  );
};

export default Editor;
