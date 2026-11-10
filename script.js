document.documentElement.classList.add('js');

const confetti = document.getElementById('confetti');
const colors = ['#f0789d', '#e8a349', '#9d7ad4', '#6dbfa2', '#ffffff'];

for (let index = 0; index < 38; index += 1) {
  const piece = document.createElement('span');
  piece.className = 'confetti__piece';
  piece.style.setProperty('--size', `${5 + (index * 7) % 8}px`);
  piece.style.setProperty('--left', `${(index * 37 + 9) % 100}%`);
  piece.style.setProperty('--top', `${(index * 29 + 3) % 93}%`);
  piece.style.setProperty('--color', colors[index % colors.length]);
  piece.style.setProperty('--rotate', `${(index * 43) % 180}deg`);
  piece.style.setProperty('--duration', `${3 + (index % 5)}s`);
  piece.style.setProperty('--delay', `${-index * .19}s`);
  confetti.appendChild(piece);
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        activeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .12, rootMargin: '0px 0px -30px 0px' });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

// Add the YouTube URL to the video card's data-youtube-url attribute when it arrives.
const videoCard = document.getElementById('video-card');
const youtubeUrl = videoCard.dataset.youtubeUrl.trim();

function extractYoutubeId(value) {
  try {
    const url = new URL(value);
    const hostname = url.hostname.replace(/^www\./, '').replace(/^m\./, '');
    let id = '';

    if (hostname === 'youtu.be') {
      id = url.pathname.split('/')[1];
    } else if (hostname === 'youtube.com' || hostname === 'youtube-nocookie.com') {
      id = url.searchParams.get('v') || url.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/)?.[1] || '';
    }

    return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
  } catch {
    return null;
  }
}

const videoId = extractYoutubeId(youtubeUrl);
if (videoId) {
  const frame = document.createElement('iframe');
  frame.src = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`;
  frame.title = 'Видео-поздравление для ONAJON';
  frame.loading = 'lazy';
  frame.referrerPolicy = 'strict-origin-when-cross-origin';
  frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  frame.allowFullscreen = true;
  videoCard.replaceChildren(frame);
  document.querySelector('.video-section__intro').textContent = 'Нажми на видео и принимай поздравления!';
}
