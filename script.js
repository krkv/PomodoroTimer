config = {}
config.workTime = 25;
config.smallBreak = 5;
config.bigBreak = 20;

var workSeconds = config.workTime * 60;
var timer;

document.onload = reset();

function reset() {
    toggleButton("button1", true);
    toggleButton("button2", false);
    setBackground("bg-stopped");
    setInterval(tick, 100);
}

function startTimer(minutes) {
    clearInterval(timer);
    if (minutes) workSeconds = minutes * 60;
    timer = setInterval(drainTimer, 1000);
    setBackground("bg-working");
    toggleButton("button2", true);
    changeButton('button1', 'pause');
}

function pauseTimer() {
    clearInterval(timer);
    setBackground("bg-paused");
    changeButton('button1', 'start');
}

function stopTimer() {
    clearInterval(timer);
    workSeconds = config.workTime * 60;
    setBackground("bg-stopped");
    toggleButton("button2", false);
    changeButton('button1', 'start');
}

function drainTimer() {
    workSeconds = workSeconds - 1;
}

function tick() {
    if (workSeconds == 0) {
        stopTimer();
        workSeconds = config.smallBreak * 60;
        var chimeAudio = document.getElementById("chime");
        chimeAudio.play();
    }
    var value = formatTime(workSeconds);
    document.getElementById('time').innerHTML = value;
}

function formatTime(seconds) {
    var m = Math.floor(seconds / 60);
    var s = workSeconds % 60;
    if (s < 10) s = "0" + s;
    return m + ":" + s;
}

function toggleButton(id, on) {
    var button = document.getElementById(id);
    if (on) {
        button.removeAttribute("disabled");
        button.className = "";
    }
    else {
        button.setAttribute("disabled", "true");
        button.className = "disabled-button";
    }
}

function changeButton(id, role) {
    var button = document.getElementById(id);
    switch (role) {
        case 'start':
            button.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>Start';
            button.setAttribute("onclick", "startTimer()");
            break;
        case 'pause':
            button.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>Pause';
            button.setAttribute("onclick", "pauseTimer()");
            break;
    }
}

function setBackground(status) {
    document.getElementById('container').className = status;
}
