const MAX_SLIDES = 3;

export default function decorate(block) {
  const slides = [...block.children].slice(0, MAX_SLIDES);
  if (!slides.length) return;

  const viewport = document.createElement('div');
  viewport.className = 'carousel-viewport';
  const track = document.createElement('div');
  track.className = 'carousel-track';

  slides.forEach((slide, index) => {
    slide.className = 'carousel-slide';
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-label', `${index + 1} of ${slides.length}`);
    slide.hidden = index !== 0;
    track.append(slide);
  });

  viewport.append(track);
  const controls = document.createElement('div');
  controls.className = 'carousel-controls';
  controls.innerHTML = '<button type="button" class="carousel-previous" aria-label="Previous slide">&#8592;</button><span class="carousel-status" aria-live="polite"></span><button type="button" class="carousel-next" aria-label="Next slide">&#8594;</button>';

  let current = 0;
  const update = (nextIndex) => {
    current = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, index) => {
      slide.hidden = index !== current;
    });
    controls.querySelector('.carousel-status').textContent = `${current + 1} / ${slides.length}`;
  };

  controls.querySelector('.carousel-previous').addEventListener('click', () => update(current - 1));
  controls.querySelector('.carousel-next').addEventListener('click', () => update(current + 1));
  block.replaceChildren(viewport, controls);
  update(0);
}
