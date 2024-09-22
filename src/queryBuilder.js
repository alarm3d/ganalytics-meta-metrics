import { OrderType, createFormatArray, toDateRange } from "./index.js";

export class QueryBuilder {
  query;
  _dimensionNames;
  _metricNames;
  constructor() {
    this.query = {
      maxResults: 1000,
      offset: 0,
      dimensions: [],
      metrics: [],
      dateRanges: [{ startDate: "30daysAgo", endDate: "yesterday" }],
    };
    this._dimensionNames = new Set();
    this._metricNames = new Set();
  }
  metrics(metrics) {
    this.query.metrics = createFormatArray(metrics);
    this._metricNames = new Set(metrics);
    return this;
  }
  dimensions(dimensions) {
    this.query.dimensions = createFormatArray(dimensions);
    this._dimensionNames = new Set(dimensions);
    return this;
  }
  period(...period) {
    if (period.length === 0 || !period[0]) return this;
    const periodArray = Array.isArray(period[0]) ? period[0] : period;
    this.query.dateRanges = toDateRange(periodArray);
    return this;
  }
  orders(orderBys) {
    if (!this._check()) {
      throw new Error(
        "`metrics` and `dimensions` must be called before `orderBys`.",
      );
    }
    this.query.orderBys = orderBys.map(([name, type]) => {
      if (this._dimensionNames.has(name)) {
        return {
          dimension: {
            orderType: type || OrderType.ORDER_TYPE_UNSPECIFIED,
            dimensionName: name,
          },
        };
      }
      if (this._metricNames.has(name)) {
        return { metric: { metricName: name } };
      }
      throw new Error(
        `OrderBy name '${name}' is not in the list of dimensions or metrics.`,
      );
    });
    return this;
  }
  filter(filter, not = false) {
    if (!this._check()) {
      throw new Error(
        "`metrics` and `dimensions` must be called before `filters`.",
      );
    }
    const expression = not ? { notExpression: { filter } } : { filter };
    if (this._dimensionNames.has(filter.fieldName)) {
      this.query.dimensionFilter = expression;
    } else if (this._metricNames.has(filter.fieldName)) {
      this.query.metricFilter = expression;
    }
    return this;
  }
  groupFilters(filters, operator = "andGroup", not = false) {
    if (!this._check()) {
      throw new Error(
        "`metrics` and `dimensions` must be called before `groupFilters`.",
      );
    }
    const expressions = not
      ? {
          notExpression: {
            [operator]: { expressions: filters.map((filter) => ({ filter })) },
          },
        }
      : { [operator]: { expressions: filters.map((filter) => ({ filter })) } };
    if (this._dimensionNames.has(filters[0].fieldName)) {
      this.query.dimensionFilter = expressions;
    } else if (this._metricNames.has(filters[0].fieldName)) {
      this.query.metricFilter = expressions;
    }
    return this;
  }
  keepEmpty() {
    this.query.keepEmptyRows = true;
    return this;
  }
  total() {
    this.query.metricAggregations = ["TOTAL"];
    return this;
  }
  max(maxResults) {
    this.query.maxResults = maxResults;
    return this;
  }
  offset(offset) {
    this.query.offset = offset;
    return this;
  }
  build() {
    if (!this._check()) {
      throw new Error(
        "`metrics` and `dimensions` must be called before `build`.",
      );
    }
    return this.query;
  }
  _check() {
    return !!this.query.metrics.length && !!this.query.dimensions.length;
  }
}
