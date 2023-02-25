document.addEventListener('DOMContentLoaded', () => {
  let gridContainer = document.getElementById("container");

  function createBookmarkElements(bookmark, parentContainer) {
    if ("children" in bookmark) {
      let folderContainer = document.createElement('div');
      folderContainer.classList.add("folder-container");
      let folderBox = document.createElement("div");
      let folderTitle = document.createElement("div");
      folderTitle.classList.add("folder-title");
      folderContainer.append(folderBox);
      folderContainer.append(folderTitle);
      folderBox.classList.add("folder-box");
      if (parentContainer.classList.contains("bookmark-grid")) {
        folderBox.classList.add("nested");
      }
      folderTitle.innerText = bookmark.title;
      let bookmarkGrid = document.createElement("div");
      folderBox.append(bookmarkGrid);
      bookmarkGrid.classList.add("bookmark-grid");
      for (const child of bookmark.children) {
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
      parentContainer.append(folderContainer);
      folderContainer.addEventListener('click', toggleFolderContainer);
    }
  }

  function toggleFolderContainer() {
    const folderContainer = this;
    folderContainer.classList.toggle('active');
    const folderBox = folderContainer.querySelector('.folder-box');
    const folderTitle = folderContainer.querySelector('.folder-title');
    const bookmarkElements = folderBox.querySelectorAll('.bookmark-element');
    const overlay = document.querySelector('.darken-background');
    folderBox.classList.toggle('active');
    folderTitle.classList.toggle('active');
    bookmarkElements.forEach(bookmarkElement => bookmarkElement.classList.toggle('active'));
  
    // Get all nested folder boxes and remove the active class
    const nestedFolderBoxes = folderBox.querySelectorAll('.folder-box.nested');
    let activeNestedFolderBox = null;
    nestedFolderBoxes.forEach(nestedFolderBox => {
      const nestedFolderContainer = nestedFolderBox.closest('.folder-container');
      if (nestedFolderContainer === folderContainer) {
        activeNestedFolderBox = nestedFolderBox;
      } else {
        nestedFolderContainer.classList.remove('nested');
        nestedFolderContainer.classList.remove('active');
        const nestedBookmarkGrid = nestedFolderBox.querySelector('.bookmark-grid');
        const nestedBookmarkElements = nestedBookmarkGrid.querySelectorAll('.bookmark-element');
        nestedFolderBox.classList.remove('active');
        nestedBookmarkElements.forEach(bookmarkElement => bookmarkElement.classList.remove('active'));
      }
    });
  
    // Add the active class to the active nested folder box
    if (activeNestedFolderBox) {
      const activeNestedFolderContainer = activeNestedFolderBox.closest('.folder-container');
      activeNestedFolderContainer.classList.add('nested');
      activeNestedFolderContainer.classList.add('active');
      const activeNestedBookmarkGrid = activeNestedFolderBox.querySelector('.bookmark-grid');
      const activeNestedBookmarkElements = activeNestedBookmarkGrid.querySelectorAll('.bookmark-element');
      activeNestedFolderBox.classList.add('active');
      activeNestedBookmarkElements.forEach(bookmarkElement => bookmarkElement.classList.add('active'));
    }
  
    function clickOutsideHandler(event) {
      if (!folderContainer.contains(event.target)) {
        folderContainer.classList.remove('active');
        folderBox.classList.remove('active');
        folderTitle.classList.remove('active');
        overlay.style.display = 'none';
        bookmarkElements.forEach(bookmarkElement => bookmarkElement.classList.remove('active'));
  
        // Remove the active class from all nested folder boxes
        nestedFolderBoxes.forEach(nestedFolderBox => {
          const nestedFolderContainer = nestedFolderBox.closest('.folder-container');
          nestedFolderContainer.classList.remove('active', 'nested');
          const nestedBookmarkGrid = nestedFolderBox.querySelector('.bookmark-grid');
          const nestedBookmarkElements = nestedBookmarkGrid.querySelectorAll('.bookmark-element');
          nestedFolderBox.classList.remove('active');
          nestedBookmarkElements.forEach(bookmarkElement => bookmarkElement.classList.remove('active'));
        });
  
        document.removeEventListener('click', clickOutsideHandler);
      }
    }
  
    document.addEventListener('click', clickOutsideHandler);
  }

  chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
    let bookmarkBar = bookmarkTreeNodes[0].children[0];
    for (const child of bookmarkBar.children) {
      createBookmarkElements(child, gridContainer);
    }
  });
});