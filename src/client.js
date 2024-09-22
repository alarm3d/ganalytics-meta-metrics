import { createCaster } from "./index.js";

export const createAnalyticsInstance = (client, customCast) => {
  const castValue = createCaster(customCast);
  const propertyId = client._opts?.propertyId;
  if (!propertyId) {
    throw new Error("propertyId is missing in the client configuration.");
  }
  const property = `properties/${propertyId}`;
  const getAnalyticRaw = async (query) => {
    try {
      const [response] = await client.runReport({
        property,
        ...query,
      });
      return response.rows || [];
    } catch (error) {
      console.error("Error fetching analytics data:", error);
      throw new Error("Failed to fetch analytics data.");
    }
  };
  const getAnalytic = async (query) => {
    const rows = await getAnalyticRaw(query);
    return rows.map((row) => {
      const rowResult = {};
      row.dimensionValues.forEach((dimensionValue, i) => {
        rowResult[query.dimensions[i].name] = castValue(
          query.dimensions[i].name,
          dimensionValue.value,
        );
      });
      row.metricValues.forEach((metricValue, i) => {
        rowResult[query.metrics[i].name] = castValue(
          query.metrics[i].name,
          metricValue.value,
        );
      });
      return rowResult;
    });
  };
  return { getAnalytic, getAnalyticRaw };
};
