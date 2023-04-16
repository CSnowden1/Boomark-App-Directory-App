let bookmarkGrid = document.getElementById("bookmark-grid");

let generateBookmarkDirectory = (bookmarks, parent) => {
  let ul = document.createElement("ul");
  ul.classList.add('menu', 'vertical');
  parent.appendChild(ul); 

  bookmarks.forEach(function(bookmark) {
    let li = document.createElement("li");
    let a = document.createElement("a");
    if (bookmark.children) {
      li.classList.add('has-submenu');
      a.setAttribute('data-toggle', 'submenu');
      a.setAttribute('aria-haspopup', 'true');
      a.setAttribute('aria-expanded', 'false');
      a.textContent = bookmark.title;
      a.href = bookmark.url;
      let submenu = generateBookmarkDirectory(bookmark.children, li);
      li.appendChild(submenu);
    } else {
      a.textContent = bookmark.title;
      a.href = bookmark.url;
    }
    li.appendChild(a);
    ul.appendChild(li);
  });

  return ul;
}


  chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
    let bookmarks = bookmarkTreeNodes;
    generateBookmarkDirectory(bookmarks, bookmarkGrid);
  });
  