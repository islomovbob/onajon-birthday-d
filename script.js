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

