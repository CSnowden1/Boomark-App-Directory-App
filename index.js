//let bookmarkGrid = document.getElementById("bookmark-grid");




const dots = document.querySelectorAll('.dot');
const panels = document.querySelector('.grid-box');

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    console.log(index)
    console.log("clicked")
    panels.style.transform = `translateX(-${index * 100}%)`;
  });
});


let folder = document.querySelectorAll("folder");
console.log(folder);
folder.forEach((bin) => {
  bin.addEventListener('clicked', () => {
    console.log("folder clicked")
    let contentBox = createElement("div");
    //add class for content box
    let container = createElement('div');
    let title = createElement("h4");
    let gridBox = createElement("div");
    let boxGrid = createElement("div")
  })
})