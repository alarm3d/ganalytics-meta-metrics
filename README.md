# ganalytics-meta-metrics

This library provides an easy way to interact with the Google Analytics Data API using JavaScript. It includes components for setting up the client, creating queries, and fetching data.

## Installation

**Install dependencies:**

```bash
    npm install https://github.com/alarm3d/ganalytics-meta-metrics.git
    npm install @google-analytics/data
```


## Examples

```javascript
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { createAnalyticsInstance, QueryBuilder } from "ganalytics-meta-metrics";

const ganalytics = {
  keyFilename: "./key.json",
  propertyId: "0123245678",
  scopes: "https://www.googleapis.com/auth/analytics.readonly",
};

const query = new QueryBuilder();
const client = new BetaAnalyticsDataClient(ganalytics);
const { getAnalytic } = createAnalyticsInstance(client);

//.............

const fetchDeviceCategory = (period) =>
  query
    .period(period)
    .dimensions(["date"])
    .metrics(["screenPageViews"])
    .orders([["date"]])
    .build();

//...........
const data = await getAnalytic(
  fetchDeviceCategory(["30daysAgo", "yesterday"]),
);

console.table(data);

```

| (index) |    date    | screenPageViews |
|---------|------------|-----------------|
|    0    | 24.08.2024 |       38        |
|    1    | 25.08.2024 |       48        |


## Contributing

To contribute to the project:

1. Fork the repository.
2. Create a branch for your contribution.
3. Make changes and test them.
4. Create a pull request with a description of the changes.

## License

This project is licensed under the [MIT License](LICENSE).
