const SETTINGS = {
  liveServer: "https://sunflowervalley.citropy.com",
  previewServer: "http://127.0.0.1:5174",
  previewHosts: ["localhost", "127.0.0.1"],
};

export const PATHS = {
  release: "/release",
  news: "/news",
  download: "/download",
  downloadFileParameter: "file",
};

const server = SETTINGS.previewHosts.includes(location.hostname) ? SETTINGS.previewServer : SETTINGS.liveServer;

export async function askServer(path) {
  const response = await fetch(`${server}${path}`);
  if (!response.ok) {
    throw new Error(`The game server answered ${path} with ${response.status}`);
  }
  return response.json();
}

export function downloadAddress(file) {
  return `${server}${PATHS.download}?${PATHS.downloadFileParameter}=${encodeURIComponent(file)}`;
}
