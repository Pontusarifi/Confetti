(async function () {

  if (!window.confetti) {
    await new Promise((resolve) => {
      const s = document.createElement("script");
      s.src =
        "https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js";
      s.onload = resolve;
      document.head.appendChild(s);
    });
  }

  if (window.spaceConfettiLoaded) return;
  window.spaceConfettiLoaded = true;

  document.addEventListener("keydown", (e) => {

    if (e.code !== "Space") return;

    e.preventDefault();

    confetti({
      particleCount: 220,
      spread: 90,
      angle: 60,
      origin: { x: 0, y: 1 }
    });

    confetti({
      particleCount: 220,
      spread: 90,
      angle: 120,
      origin: { x: 1, y: 1 }
    });

  });

})();
