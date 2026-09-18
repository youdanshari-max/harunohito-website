/* All positions use the shared 1920 × 1080 scene. Original PNGs stay intact.
 * Each asset is moved/scaled around its visible center, not its transparent canvas.
 */
const sourceBounds = [
  [221,79,253,118], [546,494,605,545], [1131,670,1195,729],
  [1418,904,1497,959], [1296,77,1336,138], [1027,247,1065,310],
  [803,544,867,604], [498,777,589,837], [900,545,967,592], [547,726,624,787],
];
// Protect the entire face, including cheeks and chin, with generous padding.
// A second, stationary CSS clipping boundary uses this exact same rectangle.
const faceExclusion = { left: 755, top: 390, right: 1145, bottom: 800 };
// Reveal order alternates sides, spreading spring outward rather than filling a row.
const positions = [
  [620,110], [1420,140], [480,300], [1510,460],
  [880,65], [570,650], [1350,720], [1160,95],
  [420,500], [1580,300], [700,245], [1270,940],
  [490,850], [1390,350], [1040,200], [1540,820],
  [390,170], [940,930], [1250,260], [630,420],
  [1480,610], [640,950], [1510,60], [440,1000],
  [790,140], [1330,540], [560,230], [1610,970],
  [1120,945], [400,710], [1440,1010], [1010,70],
  [1610,620], [570,40],
  [470,90], [1350,80], [610,800], [1530,200],
  [520,530], [1430,880], [860,260], [1250,430],
  [730,980], [1510,710], [1190,175], [520,760],
  [1350,1020], [650,310],
];
const container = document.querySelector('.petals');
const percent = (value, total) => `${value / total * 100}%`;
const f = faceExclusion;
container.style.clipPath = `polygon(evenodd, 0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%,
  ${percent(f.left,1920)} ${percent(f.top,1080)},
  ${percent(f.left,1920)} ${percent(f.bottom,1080)},
  ${percent(f.right,1920)} ${percent(f.bottom,1080)},
  ${percent(f.right,1920)} ${percent(f.top,1080)},
  ${percent(f.left,1920)} ${percent(f.top,1080)}, 0% 0%)`;
let mobileIndex = 0;
for (const [index, [x, y]] of positions.entries()) {
  const source = index % sourceBounds.length;
  const [left, top, right, bottom] = sourceBounds[source];
  const cx = (left + right) / 2, cy = (top + bottom) / 2;
  const scale = .78 + (index * 7 % 6) * .085;
  const dx = (index % 2 ? -1 : 1) * (22 + index % 5 * 4);
  const dy = (index % 3 ? 1 : -1) * (18 + index % 4 * 5);
  // The circle encloses every rotation; the envelope encloses every keyframe
  // and all interpolated positions, including the smaller mobile movement.
  const radius = Math.hypot(right - left, bottom - top) / 2 * scale + 3;
  const envelope = {left:x-radius-Math.abs(dx),right:x+radius+Math.abs(dx),
    top:y-radius-Math.abs(dy),bottom:y+radius+Math.abs(dy)};
  if (envelope.right >= f.left && envelope.left <= f.right &&
      envelope.bottom >= f.top && envelope.top <= f.bottom) {
    console.warn(`Petal ${index + 1} omitted: its path enters the protected face area.`);
    continue;
  }
  const layer = document.createElement('div');
  layer.className = 'petal';
  const mobile = index < 22 || (index >= 34 && index < 42);
  layer.dataset.mobile = String(mobile);
  layer.dataset.envelope = JSON.stringify(envelope);
  const delay = index === 0 ? 0 : 1.2 + index * 1.4;
  const turn = 7 + index % 5 * 2;
  const angle = (index * 37 % 110) - 55;
  const styles = {
    '--origin': `${percent(cx,1920)} ${percent(cy,1080)}`,
    '--offset-x': percent(x-cx,1920), '--offset-y': percent(y-cy,1080),
    '--scale': String(scale), '--angle': `${angle}deg`,
    '--delay': `${delay}s`,
    '--mobile-delay': `${mobileIndex === 0 ? 0 : 1.2 + mobileIndex * 1.4}s`,
    '--duration': `${(15 + index * 3 % 9) / 1.25}s`,
    '--phase': `${-index * 1.7}s`,
    '--dx': percent(dx,1920), '--dy': percent(dy,1080),
    '--dx-mid': percent(dx * -.35,1920), '--dy-mid': percent(dy * .45,1080),
    '--turn-start': `${angle-turn}deg`, '--turn-end': `${angle+turn}deg`,
    '--opacity': `${.66 + index % 4 * .055}`,
  };
  for (const [name, value] of Object.entries(styles)) layer.style.setProperty(name, value);
  const drift = document.createElement('div');
  drift.className = 'petal-drift';
  const image = new Image(1920, 1080);
  image.src = `./assets/images/sakura-${String(source + 1).padStart(2, '0')}.png`;
  image.alt = '';
  image.decoding = 'async';
  image.draggable = false;
  drift.append(image);
  layer.append(drift);
  container.append(layer);
  if (mobile) mobileIndex += 1;
}
const toggle = document.querySelector('.motion-toggle');
toggle.hidden = false;
toggle.addEventListener('click', () => {
  const paused = document.querySelector('.first-view').classList.toggle('is-paused');
  toggle.setAttribute('aria-pressed', String(paused));
  toggle.querySelector('.motion-label').textContent = paused ? '動きを再開する' : '動きを止める';
  toggle.querySelector('.motion-symbol').textContent = paused ? '▷' : 'Ⅱ';
});
