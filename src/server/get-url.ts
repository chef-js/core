export default function getUrl(url: string): string {
  return decodeURIComponent(
    url.replace(/^\/+/, "").split("?")[0].split("#")[0],
  );
}
