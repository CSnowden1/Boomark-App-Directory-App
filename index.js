let bookmarkGrid = document.getElementById("bookmark-grid");
window.addEventListener('load', 
    function() {
        chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
            let bookmarks = flattenNodes(bookmarkTreeNodes);
            let ul = document.createElement("ul");

            bookmarks.forEach(function(bookmark) {
                var li = document.createElement("li");
                var a = document.createElement("a");
                a.href = bookmark.url;
                a.innerText = bookmark.title;
                li.appendChild(a);
                ul.appendChild(li);
            });

            bookmarkGrid.appendChild(ul);
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
});