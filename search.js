chrome.bookmarks.search("", (results) => {
    const bookmarks = results.filter((bookmark) => bookmark.url && bookmark.title);
  
    const searchInput = document.getElementById("search-input");
    const searchResults = document.getElementById("search-results");
  
    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredBookmarks = bookmarks.filter((bookmark) => bookmark.title.toLowerCase().includes(searchTerm));
  
      if (searchTerm === "") {
        searchResults.style.display = "none";
        searchResults.innerHTML = "";
      } else {
        searchResults.style.display = "block";
        searchResults.innerHTML = "";
        filteredBookmarks.forEach((bookmark) => {
          const bookmarkLink = document.createElement("a");
          bookmarkLink.href = bookmark.url;
          bookmarkLink.textContent = bookmark.title;
          searchResults.appendChild(bookmarkLink);
        });
      }
    });
  });