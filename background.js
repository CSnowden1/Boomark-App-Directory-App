chrome.runtime.onInstalled.addListener(function() {
    chrome.bookmarks.create({title: "Bookmark Directory", parentId: "1"});
});


chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
    let bookmarksBar = bookmarkTreeNodes[0].children.find(node => node.title === "Bookmarks bar");
    let directory = bookmarksBar.children.find(node => node.title === "Bookmark Directory");
    chrome.bookmarks.getChildren(directory.id, function(bookmarks) {
        bookmarks.forEach(bookmark => {
            chrome.bookmarks.move(bookmark.id, {parentId: directory.id});
        });
    });
});


chrome.bookmarks.onCreated.addListener(function(id, bookmark) {
    if (bookmark.parentId === directory.id) {
        // code to update the list in the popup
    }
});

chrome.bookmarks.onRemoved.addListener(function(id, removeInfo) {
    if (removeInfo.parentId === directory.id) {
        // code to update the list in the popup
    }
});




console.log("This is the background JS File")
chrome.bookmarks.create({
    parentId: "bookmark_bar",
    title: "Bookmark Directory",
    url: "chrome-extension://elhmdaagaecmmgadddgmbijgkpocklih/index.html"
  });