chrome.runtime.onMessageExternal.addListener(function (
  request,
  sender,
  sendResponse
) {
  if (request.type == "fav") {
    let favlist = [];
    chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
      function traverseBookmarks(nodes) {
        for (let node of nodes) {
          if (node.url) {
            console.log(node);
            favlist.push({
              title: node.title,
              url: node.url,
            });
          }
          if (node.children) {
            traverseBookmarks(node.children);
          }
        }
      }
      traverseBookmarks(bookmarkTreeNodes);
      sendResponse({ type: "favlist", msg: JSON.stringify(favlist) });
    });
    return true;
  }
});
