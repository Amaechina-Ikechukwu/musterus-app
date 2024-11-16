export const api = process.env.EXPO_PUBLIC_API_URL;
export function newAvatar(avatar: string) {
  return `${api.slice(0, -3)}${avatar.slice(1, avatar.length)}`;
}