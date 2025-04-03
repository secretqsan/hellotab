export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { type, longitude, latitude } = query;
  const key = process.env.NUXT_QWEATHER_API_KEY;
  try {
    if (type === "location") {
      const res = await $fetch(
        `https://geoapi.qweather.com/v2/city/lookup?location=${longitude},${latitude}&key=${key}`
      );
      return res;
    } else if (type === "weather") {
      const res = await $fetch(
        `https://devapi.qweather.com/v7/weather/now?location=${longitude},${latitude}&key=${key}`
      );
      return res;
    } else {
      throw new Error("Invalid type parameter");
    }
  } catch (error) {
    console.error("Weather API error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch weather data",
    });
  }
});
