



const createBookmark = () => {
    chrome.bookmarks.create({
        parentId: "1", // the ID of the bookmark bar
        title: "Bookmark Directory",
        url: chrome.runtime.getURL("index.html"),
    });
}



const checkForMark = () => {
    chrome.bookmarks.search({'title': 'Bookmark Directory'},
    function(bookmarks){
        if(bookmarks.length > 0  ) {
            console.log("You already have the Bookmark Directory or you have a Bookmark by the same name. If you would like to use our extension, then please delete or rename the bookmark with the name 'Bookmark Directory.' ");
        } else {
            console.log("Thank You for downloading our extension!");
            console.log("Your new Bookmark Directory should now be available within your bookmark bar. If you deleted the green Bookmark Directory, then please re-download the extension.");
            createBookmark();
        }
    });
};



const makePopup = () => {

    chrome.bookmarks.onClicked.addListener(function(bookmark) {
        chrome.bookmarks.get(bookmark.id, function(bookmarkNode) {
            if (bookmarkNode[0].title === 'Bookmark Directory') {
                chrome.windows.create({
                    url: chrome.runtime.getURL("index.html"),
                    type: "popup",
                    width: 800,
                    height: 600
                });
            }
        });
    });

}




chrome.runtime.onInstalled.addListener(checkForMark(), makePopup());


