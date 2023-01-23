const fileUrl = chrome.runtime.getURL("index.html");


fetch('index.html')
  .then(response => response.text())
  .then(data => {

    document.querySelector("#myId").innerHTML = data;
  });