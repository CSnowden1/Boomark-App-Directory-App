


document.getElementById("directory-btn").addEventListener("click", function() {

    chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
    let bookmarksBar = bookmarkTreeNodes[0].children.find(node => node.title === "Bookmarks bar");
    let directory = bookmarksBar.children.find(node => node.title === "Bookmark Directory");
    chrome.tabs.create({url: directory.url});
    });
});