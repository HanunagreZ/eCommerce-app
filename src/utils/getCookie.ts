export function getCookie(name: string): string | null {
  const cookie = document.cookie.split('; ').find((el) => el.startsWith(name + '='));
  return cookie ? cookie.split('=')[1] : null;
}
