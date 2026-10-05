import { askServer, PATHS } from "./server.js";

const SETTINGS = {
  dateFormat: { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" },
};

const list = document.getElementById("news-list");
const status = document.getElementById("news-status");

try {
  const { news } = await askServer(PATHS.news);
  list.append(...news.map(newsEntry));
  status.textContent = news.length === 0 ? "No news yet." : "";
} catch (error) {
  status.textContent = "The news couldn't load right now.";
  throw error;
}

function newsEntry(story) {
  const entry = document.createElement("li");
  const more = document.createElement("details");
  const summary = document.createElement("summary");
  const date = document.createElement("time");
  date.dateTime = story.date;
  date.textContent = new Date(story.date).toLocaleDateString("en-US", SETTINGS.dateFormat);
  const title = document.createElement("strong");
  title.textContent = story.title;
  const lead = document.createElement("span");
  lead.textContent = story.summary;
  summary.append(date, title, lead);
  more.append(summary, ...story.body.map(paragraphOf));
  entry.append(more);
  return entry;
}

function paragraphOf(text) {
  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  return paragraph;
}
