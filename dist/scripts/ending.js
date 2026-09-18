/* Ending-only blinking. Never touches the first-view characters or their timers. */
(() => {
  const group = document.querySelector('.ending-companions');
  if (!group) return;
  const characters = [...group.querySelectorAll('.ending-character')];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false;
  let ready = [];
  let next = 0;
  let blinkTimer;
  let openTimer;
  const canBlink = () => visible && !document.hidden && !reduced.matches && ready.length;

  function stop() {
    clearTimeout(blinkTimer);
    clearTimeout(openTimer);
    characters.forEach(character => character.classList.remove('is-blinking'));
  }

  function schedule(delay = 3800 + Math.random() * 2000) {
    if (!canBlink()) return;
    blinkTimer = setTimeout(() => {
      if (!canBlink()) return;
      const character = ready[next % ready.length];
      next += 1;
      character.classList.add('is-blinking');
      openTimer = setTimeout(() => {
        character.classList.remove('is-blinking');
        schedule();
      }, 220);
    }, delay);
  }

  function sync() {
    stop();
    schedule(2600 + Math.random() * 1400);
  }

  reduced.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting && entries[0].intersectionRatio >= .5;
    sync();
  }, {threshold: [0, .5]}).observe(group);

  // Wait for the lazy-loaded images before switching; missing frames stay static.
  Promise.all(characters.map(async character => {
    try {
      await Promise.all([...character.querySelectorAll('img')].map(image => image.decode()));
      return character;
    } catch {
      return null;
    }
  })).then(decoded => {
    ready = decoded.filter(Boolean);
    next = Math.floor(Math.random() * Math.max(ready.length, 1));
    sync();
  });
})();
