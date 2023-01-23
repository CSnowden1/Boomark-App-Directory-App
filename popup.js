


document.getElementById("directory-btn").addEventListener("click", function() {
    chrome.windows.create({
        url: "index.html",
        type: "popup",
        width: 400,
        height: 600,

    });
});