function getCurrentTime() {
    let now = new Date();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    document.getElementById("clock-time").innerText = `${now.getHours()} : ${minutes} : ${seconds}`;
}

getCurrentTime();

setInterval(getCurrentTime, 1000);