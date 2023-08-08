let bookmarkGrid = document.getElementById("bookmark-grid");

let generateBookmarkDirectory = (bookmarks) => {
  bookmarks.forEach((bookmark) => {
    if (bookmark.children) {
      let container = document.createElement("div");
      container.classList.add("container");
      let topBox = document.createElement("div");
      topBox.classList.add("top-box");
      container.appendChild(topBox);
      let contentBox = document.createElement("div");
      contentBox.classList.add("content-box");
      topBox.appendChild(contentBox);
      let titleBox = document.createElement("h4");
      titleBox.innerText = bookmark.title;
      titleBox.classList.add("container-title");
      contentBox.appendChild(titleBox);

      let gridBox = document.createElement("div");
      gridBox.classList.add("grid-box");
      contentBox.appendChild(gridBox);

      let boxGrid = document.createElement("div");
      boxGrid.classList.add("box-grid");
      gridBox.appendChild(boxGrid);

      bookmark.children.forEach((item) => {
        let itemContainer = document.createElement("div");
        itemContainer.classList.add("item");

        if (item.url) {
          // If it's a website link, create an anchor element
          let link = document.createElement("a");
          link.href = item.url;
          link.target = "_blank"; // Open link in a new tab
          link.innerText = item.title;
          itemContainer.appendChild(link);
        } else {
          // If it's a folder, add a click event listener
          itemContainer.addEventListener("click", () => {
            console.log("Folder Clicked:", item.title, item.children);
            // Add logic to handle opening the folder content
          });

          // Create folder icon and title elements
          let folderIcon = document.createElement("i");
          folderIcon.classList.add("fas", "fa-folder", "folder");
          let folderTitle = document.createElement("p");
          folderTitle.classList.add("folder-title");
          folderTitle.innerText = item.title;

          // Append elements to item container
          itemContainer.appendChild(folderIcon);
          itemContainer.appendChild(folderTitle);
        }

        boxGrid.appendChild(itemContainer);
      });

      bookmarkGrid.appendChild(container);
    }
  });
};

chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
  let bookmarks = bookmarkTreeNodes[0].children[0].children;
  generateBookmarkDirectory(bookmarks);
});
