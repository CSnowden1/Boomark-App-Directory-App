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