export function scoreColor(s) {
  if (!s) return "";
  if (s >= 80) return "score-high";
  if (s >= 55) return "score-mid";
  return "score-low";
}

export function barColor(s) {
  if (!s) return "#3a4a60";
  if (s >= 80) return "#00f5d4";
  if (s >= 55) return "#ffd166";
  return "#ff4d6d";
}
