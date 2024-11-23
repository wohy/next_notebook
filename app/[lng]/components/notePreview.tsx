import { marked } from "marked";
import { ReactElement } from "react";
import sanitizeHtml from "sanitize-html";

// 允许的标签和属性
const allowedTags = sanitizeHtml.defaults.allowedTags.concat([
  "img",
  "h1",
  "h2",
  "h3",
  "ul",
  "ol",
  "li",
  "strong",
  "em",
  "a",
  "p",
]);

const allowedAttributes = Object.assign(
  {},
  sanitizeHtml.defaults.allowedAttributes,
  {
    img: ["alt", "src"],
    a: ["href", "title"],
  }
);

interface NotePreviewProps {
  children: string; // 传入的 Markdown 内容
}

export default function NotePreview({
  children,
}: NotePreviewProps): ReactElement {
  // 使用 marked 将 Markdown 内容转为 HTML
  const rawHtml = marked.parse(children || "");

  // 使用 sanitizeHtml 进行清理，允许的标签和属性
  const sanitizedHtml = sanitizeHtml(rawHtml, {
    allowedTags,
    allowedAttributes,
  });

  return (
    <div
      className="preview-content prose prose-lg dark:prose-invert"
      dangerouslySetInnerHTML={{
        __html: sanitizedHtml, // 直接插入清理后的 HTML
      }}
    />
  );
}
