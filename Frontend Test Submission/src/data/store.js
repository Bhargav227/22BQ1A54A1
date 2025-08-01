// store.js

export function saveShortLink(entry) {
  const allLinks = JSON.parse(localStorage.getItem("shortLinks") || "{}");
  allLinks[entry.shortCode] = entry;
  localStorage.setItem("shortLinks", JSON.stringify(allLinks));
}

export function getShortLink(shortCode) {
  const allLinks = JSON.parse(localStorage.getItem("shortLinks") || "{}");
  return allLinks[shortCode];
}

export function recordClick(shortCode, source = "direct") {
  const allLinks = JSON.parse(localStorage.getItem("shortLinks") || "{}");
  const link = allLinks[shortCode];
  if (link) {
    link.clicks = (link.clicks || 0) + 1;
    link.details = link.details || [];
    link.details.push({
      timestamp: new Date().toISOString(),
      source,
      location: "Unknown"
    });
    allLinks[shortCode] = link;
    localStorage.setItem("shortLinks", JSON.stringify(allLinks));
  }
}

export function getAllShortLinks() {
  return JSON.parse(localStorage.getItem("shortLinks") || "{}");
}
