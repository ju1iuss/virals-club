import { Node, mergeAttributes } from "@tiptap/core";

export function createVideoExtension(className: string) {
  return Node.create({
    name: "video",
    group: "block",
    atom: true,
    draggable: true,

    addAttributes() {
      return {
        src: {
          default: null,
        },
      };
    },

    parseHTML() {
      return [{ tag: "video[src]" }];
    },

    renderHTML({ HTMLAttributes }) {
      return [
        "video",
        mergeAttributes(HTMLAttributes, {
          controls: true,
          playsInline: true,
          preload: "metadata",
          class: className,
        }),
      ];
    },
  });
}

export const VideoExtensionEditor = createVideoExtension(
  "rounded-xl border border-white/10 glow-subtle w-full max-w-full my-8"
);

export const VideoExtensionPublic = createVideoExtension(
  "rounded-xl border border-black/10 dark:border-white/10 glow-subtle w-full max-w-full my-8"
);
