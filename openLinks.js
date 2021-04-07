var playGame = document.getElementById('play-button');

playGame.addEventListener("click", async() => {
    var newURL = "https://play.retro-mmo.com/";
    chrome.tabs.create({url:newURL});
});
