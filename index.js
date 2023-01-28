let gridContainer = document.getElementById("container");

function createBookmarkElements(bookmark, parentContainer) {
    if ("children" in bookmark) {
        let folderBox = document.createElement("div");
        folderBox.classList.add("folder-box");
        folderBox.innerText = bookmark.title;
        let bookmarkGrid = document.createElement("div");
        folderBox.append(bookmarkGrid);
        bookmarkGrid.classList.add("bookmark-grid");
        for(const child of bookmark.children) {
            if ("children" in child) {
                createBookmarkElements(child, bookmarkGrid);
            } else {
                let bookmarkElement = document.createElement("div");
                bookmarkElement.classList.add("bookmark-element");
                const img = document.createElement("img");
                img.src = child.url + '/favicon.ico';
                bookmarkElement.appendChild(img);
                bookmarkGrid.append(bookmarkElement);
            }
        }
        parentContainer.append(folderBox);
    }
}

chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
    let bookmarkBar = bookmarkTreeNodes[0].children[0];
    for (const child of bookmarkBar.children) {
        createBookmarkElements(child, gridContainer);
    }
});