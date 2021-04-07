var online = "";
var currentDate = new Date();

async function loadData() {
    chrome.storage.local.get(['prevDate'], async function(result){
        chrome.storage.local.get(['onlineUsers'], async function(result) {
            document.getElementById('users-online').innerHTML = `Users online: ${result.onlineUsers}`;
        });
        chrome.storage.local.get(['prevData'], async function(result){
            document.getElementById('online').innerHTML = result.prevData
        });
        const t = new Date(result['prevDate']);
        var compDate = (currentDate-t)/1000/60;
        if(compDate > 0.5 || !result.prevDate) {
            var obj = await (await fetch('https://play.retro-mmo.com/players.json')).json()
            .catch(e => {
                console.error('Error: ', e);
                online = '<li>Server is Unreachable</li>';
                document.getElementById('online').innerHTML = online;
                chrome.storage.local.set({prevData: online});
            });
            online = await getOnline(obj);
            document.getElementById('online').innerHTML = online;
            chrome.storage.local.set({prevDate: currentDate.toJSON()});
            chrome.storage.local.set({prevData: online});
        }
        else {
            console.log("Trying to refresh too early");
        }
    });
}

async function getOnline(data) {
    document.getElementById('users-online').innerHTML = `Users Online: ${data.length}`;
    chrome.storage.local.set({onlineUsers: data.length});
    for(let who of data) {
        try {
            let obj = await(await fetch(`https://play.retro-mmo.com/users/${who}.json`)).json()
                .catch(e => {
                    console.error('Error: ' , error);
                });
            online += `<li>${who} <span style="float:right;">Rank: ${obj.rank}</span></li>`;
        } catch (e) {
            console.log('error' + e);
        }
    }
    return online;
}

loadData();
