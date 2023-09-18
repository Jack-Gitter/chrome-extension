window.onload = async function() {
    let desiredTime = await chrome.storage.local.get('time')
    document.getElementById('timeToPlay').value = desiredTime.time
}

document.getElementById('setBtn').onclick = async function() {
    let time = document.getElementById('timeToPlay').value
    chrome.runtime.sendMessage({"time": time});
    time = await chrome.storage.local.get('time');
}

