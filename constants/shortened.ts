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
export const relationships = [
  { label: "In a relationship", value: 1 },
  { label: "Married", value: 2 },
  { label: "Divorced", value: 3 },
  { label: "Single", value: 4 },
  { label: "It's Complicated", value: 5 },
  { label: "Widowed", value: 6 },
  { label: "NULL", value: 0 },
];

export const educationLevel = [
  { label: "--", value: 0 },
  { label: "Dropped out", value: 1 },
  { label: "Highschool graduate", value: 2 },
  { label: "General Education Diploma (GED)", value: 3 },
  { label: "Bachelors Degree", value: 4 },
  { label: "Masters Degree", value: 5 },
  { label: "PhD", value: 6 },
];