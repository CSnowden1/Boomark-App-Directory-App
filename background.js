chrome.runtime.onInstalled.addListener(function() {
    chrome.bookmarks.create({
        parentId: "1", // the ID of the bookmark bar
        title: "Bookmark Directory",
        url: chrome.runtime.getURL("index.html")
    });
});

chrome.bookmarks.search({'title': 'Bookmark Directory'}, function(bookmarks) {
    if (bookmarks.length > 0) {
        var bookmarkId = bookmarks[0].id;
        chrome.bookmarks.onClicked.addListener(function(bookmark) {
            if (bookmark.id === bookmarkId) {
                chrome.windows.create({
                    url: 'about:blank',
                    type: "popup",
                    width: 800,
                    height: 600
                }, function(newWindow) {
                    chrome.tabs.query({active: true, windowId: newWindow.id}, function(tabs) {
                        var newTab = tabs[0];
                        chrome.tabs.executeScript(newTab.id, {file: 'content.js'});
                    });
                });
            }
        });
    }
});