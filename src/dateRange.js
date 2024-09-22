export const toDateRange = (period = ["30daysAgo", "yesterday"]) => [
  { startDate: period[0], endDate: period[1] },
];
