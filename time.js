window.onload = async function() {
    let desiredTime = await chrome.storage.local.get('time')
    let desiredTimeWorlde = await chrome.storage.local.get('timeWordle')
    document.getElementById('timeToPlay').value = desiredTime.time
    document.getElementById('timeToPlayWordle').value = desiredTimeWorlde.timeWordle
}

document.getElementById('setBtn').onclick = async function() {
    let time = document.getElementById('timeToPlay').value
    chrome.runtime.sendMessage({"time": time, "game": "connections"});
}

document.getElementById('setBtnWordle').onclick = async function() {
    let time = document.getElementById('timeToPlayWordle').value
    chrome.runtime.sendMessage({"time": time, "game": "wordle"});
}