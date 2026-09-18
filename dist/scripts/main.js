/* Coordinates use the original 1920 × 1080 canvas. Both images share 16:9.
 * [x, y, arrival seconds, drift seconds, dx %, dy %, rotation, mobile]
 * Keep each full PNG as its own layer: no cropping or modified originals.
 */
const petals = [
  [237, 98, 0, 23, 1.4, 2.8, 9, true],
  [575, 519, 4, 29, -1.8, 1.5, -8, true],
  [1163, 699, 8, 26, 1.2, -1.6, 11, false],
  [1457, 931, 12, 33, -1.1, -2.5, -7, true],
  [1316, 107, 1.2, 31, -2, 1.9, 10, true],
  [1046, 278, 6, 27, 1.5, -1.2, -9, false],
  [835, 574, 10, 35, -1.2, 2.2, 8, false],
  [543, 807, 16, 30, 2, -1.4, -11, true],
  [933, 568, 20, 34, 1.3, 1.7, 7, false],
  [585, 756, 24, 28, -1.5, -2, 9, true],
];
const container = document.querySelector('.petals');
for (const [index, [x, y, delay, duration, dx, dy, turn, mobile]] of petals.entries()) {
  const layer = document.createElement('div');
  layer.className = 'petal';
  layer.dataset.mobile = String(mobile);
  const styles = {
    '--origin': `${x / 1920 * 100}% ${y / 1080 * 100}%`,
    '--delay': `${delay}s`, '--duration': `${duration}s`, '--phase': `${-index * 2.3}s`,
    '--dx': `${dx}%`, '--dy': `${dy}%`, '--dx-mid': `${dx * .4}%`, '--dy-mid': `${dy * .55}%`,
    '--turn-start': `${-turn}deg`, '--turn-end': `${turn}deg`,
    '--opacity': `${.64 + index % 3 * .1}`,
  };
  for (const [name, value] of Object.entries(styles)) layer.style.setProperty(name, value);
  const image = new Image(1920, 1080);
  image.src = `./assets/images/sakura-${String(index + 1).padStart(2, '0')}.png`;
  image.alt = '';
  image.decoding = 'async';
  image.draggable = false;
  layer.append(image);
  container.append(layer);
}
const toggle = document.querySelector('.motion-toggle');
toggle.hidden = false;
toggle.addEventListener('click', () => {
  const paused = document.querySelector('.first-view').classList.toggle('is-paused');
  toggle.setAttribute('aria-pressed', String(paused));
  toggle.querySelector('.motion-label').textContent = paused ? '動きを再開する' : '動きを止める';
  toggle.querySelector('.motion-symbol').textContent = paused ? '▷' : 'Ⅱ';
});
