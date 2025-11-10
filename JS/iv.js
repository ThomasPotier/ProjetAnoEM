const ticks = document.querySelector(".ticks");
const labels = document.querySelector(".labels");

// Cadran réel: environ -105° à +105°
const start = -105;
const end = 105;

// Graduations tous les 10 km/h
for (let value = 0; value <= 180; value += 10) {
  const ratio = value / 180;
  const angle = start + ratio * (end - start);
  const angleLab = 180 - (start + ratio * (end - start));

  // Ticks
  const tick = document.createElement("div");
  const isMajor = value % 20 === 0;
  tick.style.width = isMajor ? "6px" : "3px";
  tick.style.height = isMajor ? "28px" : "18px";
  tick.style.transform = `translate(-50%,-50%) rotate(${angle}deg)`;
  ticks.appendChild(tick);

  // Labels (tous les 20)
  if (isMajor) {
    const label = document.createElement("div");
    label.textContent = value;
    label.style.transform = `translate(-350%,-1000%) rotate(${angleLab}deg)`;
    labels.appendChild(label);
  }
}
