//let bookmarkGrid = document.getElementById("bookmark-grid");




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