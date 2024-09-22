import { QueryBuilder } from "./index.js";

export function fetchVisitorsAndPageViewsByDate(
  period,
  maxResults = 1000,
  offset = 0,
) {
  return new QueryBuilder()
    .period(period)
    .metrics(["activeUsers", "screenPageViews"])
    .dimensions(["pageTitle", "date"])
    .orders([["date"]])
    .max(maxResults)
    .offset(offset)
    .build();
}
export function fetchTotalVisitorsAndPageViews(
  period,
  maxResults = 2000,
  offset = 0,
) {
  return new QueryBuilder()
    .period(period)
    .metrics(["activeUsers", "screenPageViews"])
    .dimensions(["date"])
    .orders([["date"]])
    .max(maxResults)
    .offset(offset)
    .build();
}
export function fetchMostVisitedPages(period, maxResults = 2000, offset = 0) {
  return new QueryBuilder()
    .period(period)
    .metrics(["screenPageViews"])
    .dimensions(["pageTitle", "fullPageUrl"])
    .orders([["screenPageViews"]])
    .max(maxResults)
    .offset(offset)
    .build();
}
export function fetchTopReferrers(period, maxResults = 2000, offset = 0) {
  return new QueryBuilder()
    .period(period)
    .metrics(["screenPageViews"])
    .dimensions(["pageReferrer"])
    .orders([["screenPageViews"]])
    .max(maxResults)
    .offset(offset)
    .build();
}
export function fetchUserTypes(period) {
  return new QueryBuilder()
    .period(period)
    .metrics(["activeUsers", "screenPageViews"])
    .dimensions(["newVsReturning"])
    .build();
}
export function fetchCountry(period) {
  return new QueryBuilder()
    .period(period)
    .metrics(["activeUsers", "screenPageViews"])
    .dimensions(["country"])
    .build();
}
export function fetchTopBrowsers(period, maxResults = 1000, offset = 0) {
  return new QueryBuilder()
    .period(period)
    .metrics(["activeUsers", "screenPageViews"])
    .dimensions(["browser"])
    .orders([["activeUsers"]])
    .max(maxResults)
    .offset(offset)
    .build();
}
export function fetchOperatingSystem(period, maxResults = 1000, offset = 0) {
  return new QueryBuilder()
    .period(period)
    .metrics(["screenPageViews", "activeUsers"])
    .dimensions(["operatingSystem"])
    .max(maxResults)
    .offset(offset)
    .build();
}
export function fetchDeviceCategory(period, maxResults = 1000, offset = 0) {
  return new QueryBuilder()
    .period(period)
    .metrics(["screenPageViews", "activeUsers"])
    .dimensions(["deviceCategory"])
    .max(maxResults)
    .offset(offset)
    .build();
}
