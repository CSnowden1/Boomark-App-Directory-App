// Retrieve the bookmarks

let gridContainer = document.getElementById("container");



chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
    const bookmarks = flattenNodes(bookmarkTreeNodes);



    bookmarks.forEach(function(bookmarkFolder) {
        if ("children" in bookmarkFolder) {
            let folderBox = document.createElement("div");
            folderBox.classList.add("folder-box");
            let folderContainer = document.createElement("div");
            folderContainer.classList.add("folder-container");
            folderBox.innerText = bookmarkFolder.title;
            gridContainer.append(folderBox);
            for(const bookmark of bookmarkFolder.children) {
                    let bookmarkElement = document.createElement("div");
                    bookmarkElement.classList.add("bookmark-element");
                    folderBox.append(folderContainer);
                    bookmarkElement.innerText = bookmark.title;
                    folderContainer.append(bookmarkElement);
            }
        }
    });

});

function flattenNodes(nodes) {
    var bookmarks = [];
    nodes.forEach(function(node) {
        bookmarks.push(node);
        if (node.children) {
            bookmarks = bookmarks.concat(flattenNodes(node.children));
        }
    });
    return bookmarks;
}


