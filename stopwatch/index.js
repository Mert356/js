let startTime = 0;
let updatedTime = 0;
let difference = 0;
let running = false;
let count = 0;
let interval = null;

const p = document.getElementById("p");
const turlar = document.getElementById("turlar");

function updateDisplay() {
  const minutes = Math.floor((difference % 3600000) / 60000).toString().padStart(2, "0");
  const seconds = Math.floor((difference % 60000) / 1000).toString().padStart(2, "0");
  const milliseconds = (difference % 1000).toString().padStart(3, "0");

  return minutes+":"+seconds+":"+milliseconds;
}

function start() {
  if (!running) {
    running = true;
    startTime = new Date().getTime() - difference;
    interval = setInterval(() => {
      updatedTime = new Date().getTime();
      difference = updatedTime - startTime;
      p.textContent = updateDisplay();
    }, 1);
  }
}

function stop() {
  if (running) {
    clearInterval(interval);
    running = false;
    count++;
    let p2 = document.createElement("p");
    p2.textContent = `${count}-) ${updateDisplay()} 🚩`;
    p2.style.color = "red";
    turlar.appendChild(p2);
  }
}

function reset() {
  stop();
  difference = 0;
  count = 0;
  p.textContent = updateDisplay();
  turlar.innerHTML = "";
}

function add() {
  count++;
  let p2 = document.createElement("p");
  p2.textContent = `${count}-) ${updateDisplay()} 🚩`;
  turlar.appendChild(p2);
}

document.getElementById("start").onclick = start;
document.getElementById("stop").onclick = stop;
document.getElementById("reset").onclick = reset;
document.getElementById("add").onclick = add;
p.textContent = updateDisplay();
