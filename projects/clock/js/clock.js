function getCurrentTime() {
    let now = new Date();
    let seconds = now.getSeconds();

    if (seconds === 0) {
        seconds = `0${seconds}`
    }

    document.getElementById("clock-time").innerText = `${now.getHours()} : ${now.getMinutes()} : ${seconds}`;
}

getCurrentTime();

setInterval(getCurrentTime, 1000);