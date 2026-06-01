(async function () {

if (window.cuteConfettiUI) return;
window.cuteConfettiUI = true;

// load confetti
if (!window.confetti) {
  await new Promise(res => {
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js";
    s.onload = res;
    document.head.appendChild(s);
  });
}

// 🎨 colors
function colors(mode) {
  const map = {
    pink:   ["#ffd1dc","#ffb3c6","#ff8fab","#ff69b4"],
    purple: ["#efe0ff","#d8b4fe","#c084fc","#a855f7"],
    blue:   ["#dbeafe","#93c5fd","#60a5fa","#3b82f6"],
    yellow: ["#fff9c4","#fff176","#ffd54f","#facc15"],
    rainbow:["#ff4d6d","#ff9e00","#ffe600","#2de2e6","#7b2cbf"]
  };
  return map[mode] || map.rainbow;
}

let mode = "rainbow";
let uiVisible = true;

// 💥 power (0–100 slider)
let power = 50;

// UI container
const ui = document.createElement("div");
ui.style.cssText = `
position:fixed;
right:20px;
bottom:20px;
z-index:999999999;
display:flex;
flex-direction:column;
gap:8px;
font-family:sans-serif;
`;

document.body.appendChild(ui);

// 💖 STYLE
const style = document.createElement("style");
style.textContent = `
.cuteSlider {
  width:140px;
  -webkit-appearance:none;
  height:10px;
  border-radius:999px;
  background: linear-gradient(90deg, #ffd1dc, #ff69b4);
  outline:none;
}

.cuteSlider::-webkit-slider-thumb {
  -webkit-appearance:none;
  width:18px;
  height:18px;
  border-radius:50%;
  background:white;
  border:3px solid #ff69b4;
  box-shadow:0 0 10px rgba(255,105,180,0.6);
  cursor:pointer;
}

.powerText {
  font-size:12px;
  text-align:center;
  color:#ff4d88;
  font-weight:bold;
}
`;
document.head.appendChild(style);

// 🎚️ slider box
const sliderBox = document.createElement("div");
sliderBox.style.cssText = `
background:rgba(255,255,255,0.85);
backdrop-filter: blur(10px);
padding:10px;
border-radius:16px;
width:150px;
text-align:center;
`;

sliderBox.innerHTML = `
<div class="powerText" id="label">Power: 50%</div>
<input id="slider" type="range" min="0" max="100" value="50" class="cuteSlider">
`;

ui.appendChild(sliderBox);

const slider = sliderBox.querySelector("#slider");
const label = sliderBox.querySelector("#label");

// update label (100% → 0%)
slider.oninput = (e) => {
  power = +e.target.value;

  const inverted = 100 - power;
  label.textContent = `Power: ${inverted}%`;
};

// 🎨 color row
const row = document.createElement("div");
row.style.cssText = `
display:flex;
gap:8px;
justify-content:center;
`;

["pink","purple","blue","yellow","rainbow"].forEach(name => {

  const c = document.createElement("div");

  c.style.cssText = `
    width:14px;
    height:14px;
    border-radius:50%;
    cursor:pointer;
    border:2px solid white;
    box-shadow:0 0 10px rgba(0,0,0,.2);
  `;

  c.style.background =
    name === "rainbow"
      ? "conic-gradient(red,orange,yellow,green,blue,purple)"
      : colors(name)[2];

  c.onclick = () => mode = name;

  row.appendChild(c);
});

ui.appendChild(row);

// 💥 burst (LOW = higher, HIGH = bottom-only mode)
function burst() {

  const c = colors(mode);

  const strength = power / 100;

  // NORMAL BURST (low-mid power)
  confetti({
    particleCount: 100 + power * 4,
    spread: 80 + power * 2,
    startVelocity: 40 + power,
    origin: { x: 0, y: 1 },
    colors: c
  });

  confetti({
    particleCount: 100 + power * 4,
    spread: 80 + power * 2,
    startVelocity: 40 + power,
    origin: { x: 1, y: 1 },
    colors: c
  });

  // 🌟 SPECIAL RULE: at 100% = ONLY bottom emitter
  if (power >= 95) {
    confetti({
      particleCount: 300,
      spread: 120,
      startVelocity: 70,
      origin: { x: 0.5, y: 1 },
      colors: c
    });
  } else {
    confetti({
      particleCount: 180,
      spread: 160,
      startVelocity: 60,
      origin: { x: 0.5, y: 0.7 },
      colors: c
    });
  }
}

// SPACE
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    burst();
  }

  if (e.code === "Enter") {
    uiVisible = !uiVisible;
    ui.style.display = uiVisible ? "flex" : "none";
  }
});

console.log("💖 Cute Confetti Slider Loaded");

})();
