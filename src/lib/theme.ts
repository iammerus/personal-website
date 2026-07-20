type Theme = 'light' | 'dark';

export function getTheme(): Theme {
  return document.documentElement.hasAttribute('data-theme') ? 'dark' : 'light';
}

export function syncThemeControls() {
  const isLight = getTheme() === 'light';
  const headerButton = document.getElementById('theme-toggle-header');
  const onButton = document.getElementById('theme-toggle-footer-on');
  const offButton = document.getElementById('theme-toggle-footer-off');
  const modeLabel = document.getElementById('theme-mode-label');

  headerButton?.classList.toggle('is-on', isLight);
  headerButton?.setAttribute('aria-pressed', String(isLight));
  headerButton?.setAttribute(
    'aria-label',
    isLight ? 'Turn bench light off (use dark mode)' : 'Turn bench light on (use light mode)',
  );
  headerButton?.setAttribute(
    'title',
    isLight ? 'Bench light on · light mode' : 'Bench light off · dark mode',
  );

  onButton?.classList.toggle('active', isLight);
  onButton?.setAttribute('aria-pressed', String(isLight));
  offButton?.classList.toggle('active', !isLight);
  offButton?.setAttribute('aria-pressed', String(!isLight));

  if (modeLabel) modeLabel.textContent = isLight ? 'light mode' : 'dark mode';
}

export function setBenchLight(isOn: boolean, source?: HTMLElement) {
  if (isOn) {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }

  syncThemeControls();

  if (source) {
    source.classList.remove('just-switched');
    // Restart the animation when the same control is used repeatedly.
    void source.offsetWidth;
    source.classList.add('just-switched');
    window.setTimeout(() => source.classList.remove('just-switched'), 420);
  }
}
