"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu, FloatingMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import { 
  Bold, Italic, List, ListOrdered, Quote, Heading1, Heading2, 
  Code, Image as ImageIcon, Link as LinkIcon, CheckSquare, Upload
} from "lucide-react";
import { uploadImage } from "@/lib/storage";
import { useRef } from "react";

interface EditorProps {
  content: any;
  onChange: (content: any) => void;
  editable?: boolean;
}

export function Editor({ content, onChange, editable = true }: EditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        link: false,
      }),
      Placeholder.configure({
        placeholder: "Start writing or type '/' for commands...",
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-xl border border-white/10 glow-subtle max-w-full h-auto my-8",
        },
      }),
      Link.configure({
        openOnClick: false,
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Highlight,
      Typography,
    ],
    content: content,
    editable: editable,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class: "prose prose-invert max-w-none focus:outline-none min-h-[200px] pb-32",
      },
    },
  });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && editor) {
      try {
        const url = await uploadImage(file);
        editor.chain().focus().setImage({ src: url }).run();
      } catch (error) {
        console.error("Image upload failed:", error);
        alert("Failed to upload image. Please try again.");
      }
    }
  };

  if (!editor) return null;

  return (
    <div className="relative w-full">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImageUpload} 
        accept="image/*" 
        className="hidden" 
      />
      
      {editable && editor && (
        <>
          <BubbleMenu 
            editor={editor} 
            options={{}}
            className="flex items-center gap-1 p-1 bg-neutral-900 border border-white/10 rounded-lg shadow-xl"
          >
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-1.5 rounded hover:bg-white/10 transition-colors ${editor.isActive("bold") ? "text-accent-vibrant" : "text-white/60"}`}
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-1.5 rounded hover:bg-white/10 transition-colors ${editor.isActive("italic") ? "text-accent-vibrant" : "text-white/60"}`}
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={`p-1.5 rounded hover:bg-white/10 transition-colors ${editor.isActive("code") ? "text-accent-vibrant" : "text-white/60"}`}
            >
              <Code className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-white/10 mx-1" />
            <button
              onClick={() => {
                const url = window.prompt("URL");
                if (url) {
                  editor.chain().focus().setLink({ href: url }).run();
                }
              }}
              className={`p-1.5 rounded hover:bg-white/10 transition-colors ${editor.isActive("link") ? "text-accent-vibrant" : "text-white/60"}`}
            >
              <LinkIcon className="w-4 h-4" />
            </button>
          </BubbleMenu>

          <FloatingMenu 
            editor={editor} 
            options={{}}
            className="flex items-center gap-1 p-1 bg-neutral-900 border border-white/10 rounded-lg shadow-xl overflow-hidden"
          >
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={`p-1.5 rounded hover:bg-white/10 transition-colors ${editor.isActive("heading", { level: 1 }) ? "text-accent-vibrant" : "text-white/60"}`}
              title="Heading 1"
            >
              <Heading1 className="w-4 h-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`p-1.5 rounded hover:bg-white/10 transition-colors ${editor.isActive("heading", { level: 2 }) ? "text-accent-vibrant" : "text-white/60"}`}
              title="Heading 2"
            >
              <Heading2 className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-white/10 mx-1" />
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`p-1.5 rounded hover:bg-white/10 transition-colors ${editor.isActive("bulletList") ? "text-accent-vibrant" : "text-white/60"}`}
              title="Bullet List"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleTaskList().run()}
              className={`p-1.5 rounded hover:bg-white/10 transition-colors ${editor.isActive("taskList") ? "text-accent-vibrant" : "text-white/60"}`}
              title="Task List"
            >
              <CheckSquare className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-white/10 mx-1" />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-1.5 rounded hover:bg-white/10 transition-colors text-white/60"
              title="Upload Image"
            >
              <Upload className="w-4 h-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`p-1.5 rounded hover:bg-white/10 transition-colors ${editor.isActive("blockquote") ? "text-accent-vibrant" : "text-white/60"}`}
              title="Blockquote"
            >
              <Quote className="w-4 h-4" />
            </button>
          </FloatingMenu>
        </>
      )}
      <EditorContent editor={editor} />
    </div>
  );
}
