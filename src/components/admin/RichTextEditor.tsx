import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
    ],

    content: value,

    editorProps: {
      attributes: {
        class:
          "min-h-[350px] rounded-b-xl border border-t-0 border-border bg-card p-5 focus:outline-none",
      },
    },

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },

  });

  if (!editor) {
    return (
      <div className="rounded-xl border border-yellow-500 p-6">
        Loading editor...
      </div>
    );
  }


  return (
    <div className="overflow-hidden rounded-xl border border-border">

      <div className="flex flex-wrap gap-2 border-b border-border bg-secondary p-3">

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBold().run()
          }
          className="rounded px-3 py-2 hover:bg-brand-primary hover:text-black"
        >
          <strong>B</strong>
        </button>


        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleItalic().run()
          }
          className="rounded px-3 py-2 hover:bg-brand-primary hover:text-black"
        >
          <em>I</em>
        </button>


        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({
              level: 1,
            }).run()
          }
          className="rounded px-3 py-2 hover:bg-brand-primary hover:text-black"
        >
          H1
        </button>


        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({
              level: 2,
            }).run()
          }
          className="rounded px-3 py-2 hover:bg-brand-primary hover:text-black"
        >
          H2
        </button>


        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          className="rounded px-3 py-2 hover:bg-brand-primary hover:text-black"
        >
          • List
        </button>


        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          className="rounded px-3 py-2 hover:bg-brand-primary hover:text-black"
        >
          1. List
        </button>

      </div>


      <EditorContent editor={editor} />

    </div>
  );
}