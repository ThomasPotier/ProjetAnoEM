const ticksContainer = document.querySelector(".ticks");
for(let i=0; i<=180; i+=10){
  const tick = document.createElement("div");
  tick.style.transform = `translate(-50%, -50%) rotate(${i - 90}deg)`;
  tick.style.height = i % 20 === 0 ? "28px" : "18px";
  ticksContainer.appendChild(tick);
}
