chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
    if (request.type == 'fav') {
      sendResponse({tyep: 'MsgFromChrome', msg: 'Hello, I am chrome extension~'});
    }
  });