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
      let topBox = document.createElement("div");
      topBox.classList.add("top-box");
      container.appendChild(topBox);
      let contentBox = document.createElement("div");
      contentBox.classList.add("content-box");
      topBox.appendChild(contentBox);
      titleContainer = document.createElement("div");
      titleContainer.classList.add("container");
      let titleBox = document.createElement("h4");
      titleBox.innerText = bookmark.title;
      titleContainer.appendChild(titleBox)
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

          let namelessDiv = document.createElement("div");
          let folderIcon = document.createElement("i");
          folderIcon.classList.add("fas");
          folderIcon.classList.add("fa-folder");
          folderIcon.classList.add("folder");
          namelessDiv.appendChild(folderIcon);
          
          let namelessDivTwo = document.createElement("div");
          let iconName = document.createElement("p");
          iconName.innerText = item.title;

          namelessDivTwo.appendChild(iconName);

          itemContainer.appendChild(namelessDiv);
          itemContainer.appendChild(namelessDivTwo);

          boxGrid.appendChild(itemContainer);
        })

      bookmarkGrid.appendChild(container);
    }
  });
};

chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
  let bookmarks = bookmarkTreeNodes[0].children[0].children;
  generateBookmarkDirectory(bookmarks);
});

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