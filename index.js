//let bookmarkGrid = document.getElementById("bookmark-grid");

let bookmarkGrid = document.getElementById("bookmark-grid");
let containerElement = document.createElement("div").classList.add("container");
let topBoxElement = document.createElement("div").classList.add("top-box");
let contentBoxElement = document.createElement("div").classList.add("content-box");
let gridBoxElement = document.createElement("div").classList.add("grid-box");
let itemElement = document.createElement("div").classList.add("item");
let folderElement = document.createElement("div").document.createElement("i").classList.add("fas fa-folder folder");
folderElement.id = "folder";
let folderNameElement = document.createElement("div").document.createElement("p");


let gridFolderItem = containerElement.append(topBoxElement).append(contentBoxElement).append(gridBoxElement).append(itemElement).append(itemElement).append(folderElement).append(folderNameElement)


let generateBookmarkDirectory = (bookmarks, parent) => {
  let ul = document.createElement("ul");
  ul.classList.add('menu', 'vertical');
  parent.appendChild(ul); // Append the submenu to the parent <li> element

  bookmarks.forEach(function(bookmark) {
    if (bookmark.hasOwnProperty('children')) {
      console.log('This is a Folder');
      bookmarkGrid.append(gridFolderItem)
    } else {
      bookmarkGrid.append(folderElement)
    }
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.textContent = bookmark.title;
    if (bookmark.children) {
      li.classList.add('has-submenu');
      a.setAttribute('data-toggle', 'submenu');
      a.setAttribute('aria-haspopup', 'true');
      a.setAttribute('aria-expanded', 'false');
      let submenu = generateBookmarkDirectory(bookmark.children, li);
      li.appendChild(submenu);
    } else {
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


const dots = document.querySelectorAll('.dot');
const panels = document.querySelector('.grid-box');
const topBox = document.querySelector('.top-box');
console.log(dots);
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    panels.style.transform = `translateX(-${index * 100}%)`;
  });
});


let folder = document.querySelectorAll(".folder");
console.log(folder);


folder.forEach((bin) => {
  bin.addEventListener('click', () => {
    console.log("folder clicked")
    let folderContainer = document.createElement('div');
    let xButton= document.createElement('h3')
    xButton.textContent = "X";
    folderContainer.classList.add("folder-content-box");
    topBox.append(folderContainer);
    folderContainer.append(xButton);
    folderContainer.append(folder[0]);
    xButton.addEventListener('click', () => {
      console.log('X clicked')
      folderContainer.remove()
    })
  })
})