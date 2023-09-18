function timeToMillis(time) {
  let today = new Date();
  let timeArray = time.split(":")
  let hours = parseInt(timeArray[0])
  let minutes = parseInt(timeArray[1])
  let currentHours = today.getHours();
  let currentMinutes = today.getMinutes();
  let currentSeconds = today.getSeconds();
  hours -= currentHours;
  minutes -= currentMinutes;
  hours *= 3_600_000;
  minutes *= 60000;
  console.log(hours + minutes - (currentSeconds * 1000))
  return hours + minutes - (currentSeconds * 1000);
}

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.game === 'connections') {
    chrome.storage.local.set({"time": request.time})
    chrome.alarms.create('connections', {
      when: Date.now() + timeToMillis(request.time),
      periodInMinutes: 1440
    })
  } else {
    chrome.storage.local.set({"timeWordle": request.time})
    console.log(chrome.storage.local.get())
    chrome.alarms.create('wordle', {
     when: Date.now() + timeToMillis(request.time),
     periodInMinutes: 1440
    })
  }
});

chrome.alarms.onAlarm.addListener((alarm) => {
  chrome.tabs.create({active: true, index: 0})
  if (alarm.name === 'connections') {
    chrome.tabs.update({url: "https://www.nytimes.com/games/connections"});
  } else {
    chrome.tabs.update({url: "https://www.nytimes.com/games/wordle/index.html"})
  }
});