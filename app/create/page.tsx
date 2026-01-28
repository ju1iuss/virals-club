import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";

export default async function CreatePage() {
  const admin = await isAdmin();
  if (!admin) {
    redirect("/");
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const slug = `new-page-${Math.random().toString(36).substring(2, 7)}`;
  
  const { data: page, error } = await supabase
    .from("pages")
    .insert({
      slug,
      type: "guide",
      title: "New Page Title",
      subtitle: "Add a subtitle here",
      category: "Uncategorized",
      author: user?.email?.split('@')[0] || "VCD Team",
      date: new Date().toLocaleDateString("de-DE", { day: "numeric", month: "short", year: "numeric" }),
      read_time: "5 min read",
      content: { type: "doc", content: [] },
      gated: true
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating page:", error);
    redirect("/");
  }

  redirect(`/guides/${page.slug}`);
}
