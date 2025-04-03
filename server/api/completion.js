export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { message } = query;
  const key = process.env.NUXT_GLM_API_KEY;
  try {
    const response = await $fetch(
      `https://open.bigmodel.cn/api/paas/v4/chat/completions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: {
          model: "glm-4-flashx",
          messages: [
            {
              role: "system",
              content:
                "根据提供的片段给出接下来最合理的几个字，以让整个语句构成一个有意义的简短提问，不要重复我提供的内容",
            },
            { role: "user", content: message },
          ],
        },
      }
    );
    let result = response.choices?.[0]?.message?.content?.trim() || "";
    return result;
  } catch (error) {
    console.error("GLM API error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch completion",
    });
  }
});
