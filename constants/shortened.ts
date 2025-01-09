export const api = process.env.EXPO_PUBLIC_API_URL;
export function newAvatar(avatar: string | null): string {
  if (!avatar) {
    return "";
  }
  if (!api) {
    return "";
  }
  return `${api.slice(0, -3)}/${avatar.slice(1)}`;
}

export function checkMediaType(oldurl: string): "image" | "video" | "unknown" {
  const url = newAvatar(oldurl);

  // Define file extensions for images and videos
  const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|webp|svg|tiff)$/i;
  const videoExtensions = /\.(mp4|avi|mov|wmv|flv|mkv|webm|3gp|ogg)$/i;

  if (imageExtensions.test(url)) {
    return "image";
  } else if (videoExtensions.test(url)) {
    return "video";
  }

  // Return "unknown" if no match is found
  return "unknown";
}
