function updateTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const hour = hours.toString().padStart(2,"0");
  const minute = minutes.toString().padStart(2,"0");
  const second = seconds.toString().padStart(2,"0");
  const timeString = hour + ":" + minute + ":" + second;
  document.getElementById("hour").textContent = timeString;
}
updateTime()
setInterval(updateTime,1000);
