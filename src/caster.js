export const createCaster = (customCast = {}) => {
  const defaultCast = {
    date: (value) =>
      `${value.slice(6, 8)}.${value.slice(4, 6)}.${value.slice(0, 4)}`,
    visitors: (value) => parseInt(value, 10),
    pageViews: (value) => parseInt(value, 10),
    activeUsers: (value) => parseInt(value, 10),
    newUsers: (value) => parseInt(value, 10),
    screenPageViews: (value) => parseInt(value, 10),
    active1DayUsers: (value) => parseInt(value, 10),
    active7DayUsers: (value) => parseInt(value, 10),
    active28DayUsers: (value) => parseInt(value, 10),
  };
  return (key, value) => {
    const castFn = customCast[key] || defaultCast[key] || ((val) => val);
    return castFn(value);
  };
};
