//let bookmarkGrid = document.getElementById("bookmark-grid");

let bookmarkGrid = document.getElementById("bookmark-grid");
let containerElement = document.createElement("div").classList.add("container");
let topBoxElement = document.createElement("div").classList.add("top-box");
let contentBoxElement = document.createElement("div").classList.add("content-box");
let gridBoxElement = document.createElement("div").classList.add("grid-box");
let itemElement = document.createElement("div").classList.add("item");
let folderElement = document.createElement("div")
let folderItem = document.createElement("i").classList.add("fas");
let folderNameElement = document.createElement("div");
let folderName = document.createElement("p");




let generateBookmarkDirectory = (bookmarks) => {
  bookmarks.forEach((bookmark) => {
    if (bookmark.children) {
      let container = document.createElement("div");
      container.classList.add("container");
      container.append(topBoxElement);
      topBoxElement.append(contentBoxElement);
      contentBoxElement.append(gridBoxElement);
     
      folderElement(folderItem)
      bookmarkGrid.appendChild(container);
        bookmark.forEach((item) => {
          if(item.children) {
            gridBoxElement.append(itemElement);
            itemElement.append(folderElement);
            folderElement.id = "folder";
            folderElement.append(folderNameElement);
            folderNameElement.append(folderName);
          }
        })
    }
  });
};
    //let li = document.createElement("li");
    //let a = document.createElement("a");
    //a.textContent = bookmark.title;
    //if (bookmark.children) {
    //  li.classList.add('has-submenu');
     // a.setAttribute('data-toggle', 'submenu');
      //a.setAttribute('aria-haspopup', 'true');
      //a.setAttribute('aria-expanded', 'false');
      //let submenu = generateBookmarkDirectory(bookmark.children, li);
      //li.appendChild(submenu);
    //} else {
     // a.href = bookmark.url;
    //}
    //li.appendChild(a);
    //ul.appendChild(li);

chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
  let bookmarks = bookmarkTreeNodes[0].children[0].children;
  generateBookmarkDirectory(bookmarks);
  console.log(bookmarks)
  console.log(bookmarkTreeNodes[0].children[0].children)
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