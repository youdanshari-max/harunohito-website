/* Set each application URL once in index.html: data-application-url="https://...".
   Empty or invalid URLs keep the static disabled button and its preparation note. */
(() => {
  document.querySelectorAll('.voice-service-link[data-application-url]').forEach((button) => {
    const destination = button.dataset.applicationUrl.trim();
    if (!destination) return;
    let url;
    try { url = new URL(destination); } catch { return; }
    if (url.protocol !== 'https:') return;
    const link = document.createElement('a');
    link.className = button.className;
    link.href = url.href;
    link.append(...button.childNodes);
    const note = document.getElementById(button.getAttribute('aria-describedby'));
    button.replaceWith(link);
    if (note) note.hidden = true;
  });
})();
