import { askServer, downloadAddress, PATHS } from "./server.js";

const SETTINGS = {
  program: "launcher",
  platformNames: { windows: "Windows", linux: "Linux" },
  bytesPerMegabyte: 1_000_000,
  downloadIcon:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21 15v4h-2v-4zm-2 4v2H5v-2zM5 15v4H3v-4zm8-12v14h-2V3z"/><path d="M7 11v2h10v-2zm2 2v2h2v-2zm4 0v2h2v-2z"/><path d="M15 11v2h2v-2z"/></svg>',
};

const buttons = document.getElementById("download-buttons");
const details = document.getElementById("download-details");
const status = document.getElementById("download-status");

try {
  showRelease(await askServer(PATHS.release));
} catch (error) {
  status.textContent = "The downloads are offline right now. Try again in a little while.";
  throw error;
}

function showRelease(release) {
  const platforms = Object.keys(release.downloads).filter((platform) => release.downloads[platform][SETTINGS.program]);
  const visitorPlatform = platforms.find((platform) => navigator.userAgent.includes(SETTINGS.platformNames[platform]));
  const ordered = visitorPlatform ? [visitorPlatform, ...platforms.filter((platform) => platform !== visitorPlatform)] : platforms;
  ordered.forEach((platform, index) => {
    const isMain = index === 0 && visitorPlatform !== undefined;
    buttons.append(downloadButton(platform, release.downloads[platform][SETTINGS.program], isMain));
  });
  platforms.forEach((platform) => {
    document.querySelectorAll(`[data-executable="${platform}"]`).forEach((code) => {
      code.textContent = release.downloads[platform][SETTINGS.program].executable;
    });
  });
  details.textContent = `Version ${release.version}`;
  status.textContent = visitorPlatform
    ? ""
    : `Project Sunflower runs on ${platforms.map((platform) => SETTINGS.platformNames[platform]).join(" and ")}.`;
}

function downloadButton(platform, download, isMain) {
  const button = document.createElement("a");
  button.className = isMain ? "button button-main" : "button button-other";
  button.href = downloadAddress(download.file);
  const megabytes = Math.round(download.bytes / SETTINGS.bytesPerMegabyte);
  button.innerHTML = `${SETTINGS.downloadIcon}<span>Download for ${SETTINGS.platformNames[platform]}</span><small>${megabytes} MB</small>`;
  return button;
}
