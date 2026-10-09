"use client"

import {
  EditorContent,
  useEditor,
  useEditorState,
  type Editor,
} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { cn } from "cn"
import {
  Bold,
  Heading2,
  Heading3,
  Italic,
  Link2,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo2,
  Undo2,
  type LucideIcon,
} from "lucide-react"

type Props = {
  id: string
  value: string
  onChange: (html: string) => void
  invalid?: boolean
  describedBy?: string
}

// Headings, paragraphs, bold/italic, lists, quotes and links; nothing else. Output is HTML, which
// the API sanitises again before saving.
export function RichTextEditor({
  id,
  value,
  onChange,
  invalid,
  describedBy,
}: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        code: false,
        codeBlock: false,
        strike: false,
        underline: false,
        link: { openOnClick: false, autolink: true, defaultProtocol: "https" },
      }),
    ],
    content: value,
    // Rendered on the client only; avoids a hydration mismatch.
    immediatelyRender: false,
    editorProps: {
      attributes: {
        id,
        role: "textbox",
        "aria-multiline": "true",
        ...(describedBy ? { "aria-describedby": describedBy } : {}),
        class: "rich-text min-h-72 px-4 py-3 outline-none",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.isEmpty ? "" : editor.getHTML()),
  })

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-input bg-background shadow-xs focus-within:border-brand-300 focus-within:ring-4 focus-within:ring-ring",
        invalid && "border-red-300 focus-within:ring-destructive-ring"
      )}
    >
      {editor && <Toolbar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  )
}

type Tool = {
  label: string
  icon: LucideIcon
  run: (e: Editor) => void
  active?: (e: Editor) => boolean
}

const tools: Tool[][] = [
  [
    {
      label: "Heading",
      icon: Heading2,
      run: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(),
      active: (e) => e.isActive("heading", { level: 2 }),
    },
    {
      label: "Subheading",
      icon: Heading3,
      run: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(),
      active: (e) => e.isActive("heading", { level: 3 }),
    },
  ],
  [
    {
      label: "Bold",
      icon: Bold,
      run: (e) => e.chain().focus().toggleBold().run(),
      active: (e) => e.isActive("bold"),
    },
    {
      label: "Italic",
      icon: Italic,
      run: (e) => e.chain().focus().toggleItalic().run(),
      active: (e) => e.isActive("italic"),
    },
    {
      label: "Link",
      icon: Link2,
      run: toggleLink,
      active: (e) => e.isActive("link"),
    },
  ],
  [
    {
      label: "Bulleted list",
      icon: List,
      run: (e) => e.chain().focus().toggleBulletList().run(),
      active: (e) => e.isActive("bulletList"),
    },
    {
      label: "Numbered list",
      icon: ListOrdered,
      run: (e) => e.chain().focus().toggleOrderedList().run(),
      active: (e) => e.isActive("orderedList"),
    },
    {
      label: "Quote",
      icon: Quote,
      run: (e) => e.chain().focus().toggleBlockquote().run(),
      active: (e) => e.isActive("blockquote"),
    },
    {
      label: "Divider",
      icon: Minus,
      run: (e) => e.chain().focus().setHorizontalRule().run(),
    },
  ],
  [
    { label: "Undo", icon: Undo2, run: (e) => e.chain().focus().undo().run() },
    { label: "Redo", icon: Redo2, run: (e) => e.chain().focus().redo().run() },
  ],
]

// ponytail: window.prompt for the URL; swap for a small popover if editors use links a lot.
function toggleLink(e: Editor) {
  if (e.isActive("link")) return void e.chain().focus().unsetLink().run()
  const url = window.prompt("Link address (https://…)")?.trim()
  if (url)
    e.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
}

function Toolbar({ editor }: { editor: Editor }) {
  // Re-render on selection changes so the active states stay right.
  const active = useEditorState({
    editor,
    selector: ({ editor: e }) =>
      tools.flat().map((t) => t.active?.(e) ?? false),
  })
  let i = 0
  return (
    <div
      role="toolbar"
      aria-label="Formatting"
      className="flex flex-wrap items-center gap-0.5 border-b border-neutral-200 bg-neutral-50 p-1.5"
    >
      {tools.map((group, g) => (
        <div
          key={g}
          className="flex items-center gap-0.5 not-first:border-s not-first:border-neutral-200 not-first:ps-1.5 not-last:pe-1"
        >
          {group.map((tool) => {
            const on = active[i++]
            const Icon = tool.icon
            return (
              <button
                key={tool.label}
                type="button"
                title={tool.label}
                aria-label={tool.label}
                aria-pressed={tool.active ? on : undefined}
                // Keep focus (and the selection) in the editor, so typing right after a click
                // lands in the text instead of on this button.
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => tool.run(editor)}
                className={cn(
                  "grid size-8 place-items-center rounded-md text-neutral-600 transition-colors hover:bg-neutral-200/60 hover:text-foreground focus-visible:ring-4 focus-visible:ring-ring focus-visible:outline-none",
                  on &&
                    "bg-white text-foreground shadow-xs ring-1 ring-neutral-200"
                )}
              >
                <Icon className="size-4" aria-hidden />
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}
