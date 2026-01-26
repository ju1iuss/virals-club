import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export async function getGuideBySlug(slug: string) {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  return {
    meta: data,
    content,
    slug,
  };
}

export async function getAllGuides() {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  
  const files = fs.readdirSync(CONTENT_DIR);
  const guides = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const fileContent = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
      const { data } = matter(fileContent);
      return {
        meta: data,
        slug: file.replace(".mdx", ""),
      };
    });

  return guides;
}
