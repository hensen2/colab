import MenuBar from "./MenuBar";
import {
  EditorContent,
  FloatingMenu,
  BubbleMenu,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Collaboration from "@tiptap/extension-collaboration";
import * as Y from "yjs";
import { HocuspocusProvider } from "@hocuspocus/provider";

const provider = new HocuspocusProvider({
  url: `ws://localhost:8080/api/experiments/${"hello"}`,
  name: "example-document",
  document: new Y.Doc(),
  onConnect: () => {
    console.log("connected");
  },
});

const Editor = () => {
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
    ],
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
      <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
    </div>
  );
};

export default Editor;
