export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const headers = getHeaders(event);
  const method = event.method;
  const body = await readBody(event).catch(() => null);
  const { dest } = event.context.params;

  if (!dest) {
    throw createError({
      statusCode: 400,
      message: "Missing url parameter",
    });
  }
  try {
    // 构建完整URL，包含查询参数
    var fullUrl = new URL(dest);
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        fullUrl.searchParams.append(key, value);
      });
    }
    const response = await fetch(fullUrl, {
      method: method,
      headers: headers || {},
      body: body || null,
    });

    const contentType = response.headers.get("content-type");
    event.node.res.setHeader(
      "Content-Type",
      contentType || "application/octet-stream"
    );

    if (contentType?.includes("application/json")) {
      return await response.json();
    } else if (contentType?.includes("text/")) {
      return await response.text();
    } else {
      return Buffer.from(await response.arrayBuffer());
    }
  } catch (error) {
    console.error("Proxy error:", error);
    throw createError({
      statusCode: 500,
      message: `Failed to fetch: ${error.message}`,
    });
  }
});
