// Utility to get today's date in yyyy-MM-dd format
export function getTodayDateObj() {
  return new Date();
}

export function getDateKey(date: string | Date) {
  const d = new Date(date);
  return d.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });


}


