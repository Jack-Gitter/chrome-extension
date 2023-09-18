/* chrome.runtime.onInstalled.addListener(async ({ reason }) => {
    if (reason !== 'install') {
      return;
    }
  
    // Create an alarm so we have something to look at in the demo
    await chrome.alarms.create('demo-default-alarm', {
      delayInMinutes: .1,
    });
  });

*/

// chrome.runtime.onStartup.addListener <-- if the alarm has expired, redirect

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
    chrome.storage.local.set({"time": request.time})
    console.log(request.time)
    chrome.alarms.create('connections alarm', {
      when: Date.now() + timeToMillis(request.time),
      periodInMinutes: 1440
    })
});

  chrome.alarms.onAlarm.addListener((alarm) => {
    chrome.tabs.create({active: true, index: 0})
    chrome.tabs.update({url: "https://www.nytimes.com/games/connections"});
  });