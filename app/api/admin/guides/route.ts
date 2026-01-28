import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/admin";

export async function GET(request: NextRequest) {
  try {
    const admin = await isAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const type = searchParams.get("type");

    const supabase = await createClient();
    
    if (id) {
      const { data: page, error } = await supabase
        .from("pages")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return NextResponse.json(page);
    } else {
      let query = supabase
        .from("pages")
        .select("*");
      
      if (type) {
        query = query.eq("type", type);
      }
      
      const { data: pages, error } = await query.order("created_at", { ascending: false });

      if (error) throw error;
      return NextResponse.json(pages);
    }
  } catch (error) {
    console.error("Error loading pages:", error);
    return NextResponse.json(
      { error: "Failed to load pages" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await isAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const { id, slug, type, title, subtitle, category, author, date, read_time, gated, image, content } = body;

    if (!type) {
      return NextResponse.json({ error: "Type is required" }, { status: 400 });
    }

    const supabase = await createClient();
    
    const pageData = {
      slug,
      type,
      title,
      subtitle,
      category,
      author,
      date,
      read_time,
      gated,
      image,
      content,
    };

    let result;
    if (id) {
      // Update
      const { data, error } = await supabase
        .from("pages")
        .update(pageData)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      result = data;
    } else {
      // Insert
      const { data, error } = await supabase
        .from("pages")
        .insert(pageData)
        .select()
        .single();
      
      if (error) throw error;
      result = data;
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error saving page:", error);
    return NextResponse.json(
      { error: "Failed to save page" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const admin = await isAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const supabase = await createClient();
    const { error } = await supabase
      .from("pages")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting page:", error);
    return NextResponse.json(
      { error: "Failed to delete page" },
      { status: 500 }
    );
  }
}
