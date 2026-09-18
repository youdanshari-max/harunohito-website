/* Independent of the petals and brand replay. Respects OS motion preference and desktop-only visibility. */
(() => {
  const mobile = window.matchMedia('(max-width: 700px)');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const companions = [...document.querySelectorAll('.companion')];
  let ready = [];
  let blinkTimer;
  let openTimer;
  let lastCompanion = null;
  let lastBlinkAt = 0;

  const canBlink = () => !reduced.matches && !document.hidden && !mobile.matches;

  function stop() {
    clearTimeout(blinkTimer);
    clearTimeout(openTimer);
    for (const companion of companions) companion.classList.remove('is-blinking');
  }

  function schedule(delay = 6500 + Math.random() * 4000) {
    if (!canBlink() || !ready.length) return;
    blinkTimer = setTimeout(() => {
      if (!canBlink()) return;
      let index = Math.floor(Math.random() * ready.length);
      // One blink at a time; avoid frequent repeats by the same character.
      if (ready[index] === lastCompanion && performance.now() - lastBlinkAt < 9500 && ready.length > 1) {
        index = (index + 1) % ready.length;
      }
      const companion = ready[index];
      companion.classList.add('is-blinking');
      lastCompanion = companion;
      lastBlinkAt = performance.now();
      openTimer = setTimeout(() => {
        companion.classList.remove('is-blinking');
        schedule();
      }, 220);
    }, delay);
  }

  function sync() {
    stop();
    schedule(8500 + Math.random() * 3000);
  }

  // Resume with a quiet interval when returning to the desktop layout.
  mobile.addEventListener('change', sync);
  reduced.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);

  // Decode both states before blinking so the first switch never shows an empty frame.
  Promise.all(companions.map(async companion => {
    try {
      await Promise.all([...companion.querySelectorAll('img')].map(image => image.decode()));
      return companion;
    } catch {
      return null; // An unavailable difference image leaves the basic image static.
    }
  })).then(decoded => {
    ready = decoded.filter(Boolean);
    sync();
  });
})();
