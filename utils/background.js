export default async function fetchOnlineImageUrl(provider) {
  var url = "";
  try {
    switch (provider) {
      case "bing":
        var res = await $fetch(
          "/api/proxy?url=https://www.bing.com/HPImageArchive.aspx&format=js&idx=0&n=1"
        );
        url = `https://www.bing.com${res.images[0].url}`;
        break;
      case "unsplash":
        var res = await $fetch(
          "/api/proxy?url=URL_ADDRESS.unsplash.com/random/1920x1080"
        );
        url = res;
        break;
    }
  } catch (err) {
    console.error("获取背景图片失败:", err);
  }
  return url;
}
