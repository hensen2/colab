import MenuBar from "./menu-bar";
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

const doc = new Y.Doc();

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
      }),
      Highlight,
      TaskList,
      TaskItem,
      Collaboration.configure({
        document: doc,
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
