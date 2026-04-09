import { createClient } from "@/lib/supabase/client";

const VIDEO_MAX_BYTES = 10 * 1024 * 1024;

const VIDEO_TYPES = new Set([
  "video/mp4",
  "video/webm",
  "video/quicktime",
]);

function assertVideoFile(file: File) {
  if (file.size > VIDEO_MAX_BYTES) {
    throw new Error("Video must be 10MB or smaller.");
  }
  if (file.type && !VIDEO_TYPES.has(file.type)) {
    throw new Error("Use MP4, WebM, or MOV.");
  }
}

export async function uploadImage(file: File): Promise<string> {
  const supabase = createClient();
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error } = await supabase.storage
    .from("content-images")
    .upload(filePath, file);

  if (error) {
    throw error;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("content-images").getPublicUrl(filePath);

  return publicUrl;
}

export async function uploadVideo(file: File): Promise<string> {
  assertVideoFile(file);
  const supabase = createClient();
  const fileExt = file.name.split(".").pop() || "mp4";
  const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error } = await supabase.storage
    .from("content-videos")
    .upload(filePath, file, {
      contentType: file.type || "video/mp4",
      upsert: false,
    });

  if (error) {
    throw error;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("content-videos").getPublicUrl(filePath);

  return publicUrl;
}
