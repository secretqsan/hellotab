export default defineCachedEventHandler(
  async (event) => {
    var backgrounds = {
      bing: "",
      unsplash: "a",
    };
    var response;
    response = await $fetch("https://www.bing.com/HPImageArchive.aspx",{
      params: {
        n: 1,
        idx: 0,
        format: "js",
      }
    });
    backgrounds.bing = `https://www.bing.com${response.images[0].url}`;
    
    response = await $fetch("https://api.unsplash.com/photos/random", {
      params: {
        topic: "bo8jQKTaE0Y",
        client_id: process.env.NUXT_UNSPLASH_ACCESS_KEY,
        orientation: 'landscape',
      },
    });
    backgrounds.unsplash = response.urls.full;
    return backgrounds;
  },
  {
    maxAge: 60 * 60 * 6,
    swr: true,
  }
);
