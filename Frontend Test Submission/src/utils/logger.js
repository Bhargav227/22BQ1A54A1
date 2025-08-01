const logs = [];

export function logEvent(eventType, details) {
  const timestamp = new Date().toISOString();
  logs.push({ timestamp, eventType, details });
}

export function getLogs() {
  return logs;
}
