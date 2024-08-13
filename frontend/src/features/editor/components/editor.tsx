import MenuBar from "./MenuBar";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { HocuspocusProvider } from "@hocuspocus/provider";
// import { useMemo } from "react";
// import * as Y from "yjs";

interface IEditorProps {
  provider: HocuspocusProvider;
  // experimentId: string;
}

const Editor = ({ provider }: IEditorProps) => {
  console.log(provider);
  // Cleanup provider instance
  // useEffect(() => {
  //   return () => {
  //     if (provider) {
  //       provider.destroy();
  //     }
  //   };
  // }, [provider]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "py-0 px-4",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "py-0 px-4",
          },
        },
        heading: {
          HTMLAttributes: {
            class: "leading-[1.1]",
          },
        },
        history: false,
      }),
      Highlight,
      TaskList,
      TaskItem,
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
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl p-5 min-w-full focus:outline-none",
      },
    },
  });

  return (
    <div className="h-full overflow-hidden rounded-lg border-[2.5px] border-indigo-600 bg-white text-gray-700 shadow-md">
      {editor && <MenuBar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
