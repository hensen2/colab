import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";

const Extensions = [
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
];

export default Extensions;
