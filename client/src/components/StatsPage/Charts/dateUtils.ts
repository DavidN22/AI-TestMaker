// Utility to get today's date in yyyy-MM-dd format
export function getTodayDateObj() {
  return new Date();
}

export function getDateKey(date: string | Date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
}
