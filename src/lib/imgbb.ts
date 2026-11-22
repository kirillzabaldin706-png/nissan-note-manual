/**
 * imgbb upload helper
 * Get a free API key at https://api.imgbb.com/
 * Put it in .env.local as NEXT_PUBLIC_IMGBB_API_KEY
 */

export interface ImgbbResponse {
  success: boolean;
  data?: {
    id: string;
    title: string;
    url: string;
    display_url: string;
    delete_url: string;
    size: number;
    time: number;
    image: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
  };
  error?: {
    message: string;
    code: number;
  };
}

export async function uploadToImgbb(
  file: File,
  name?: string
): Promise<{ url: string; displayUrl: string; deleteUrl: string } | null> {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  if (!apiKey || apiKey === "YOUR_IMGBB_API_KEY") {
    console.error("NEXT_PUBLIC_IMGBB_API_KEY is not set");
    return null;
  }

  const formData = new FormData();
  formData.append("image", file);
  if (name) formData.append("name", name);

  try {
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const json: ImgbbResponse = await response.json();

    if (!json.success || !json.data) {
      console.error("imgbb upload failed:", json.error);
      return null;
    }

    return {
      url: json.data.url,
      displayUrl: json.data.display_url,
      deleteUrl: json.data.delete_url,
    };
  } catch (err) {
    console.error("imgbb network error:", err);
    return null;
  }
}

/**
 * Client-side helper that returns a data URL for preview
 * before uploading to imgbb.
 */
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
