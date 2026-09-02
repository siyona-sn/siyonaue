export default function decorate(block) {
  const rows = [...block.children];

  const image = rows[0];
  const heading = rows[1];
  const text = rows[2];
  const button = rows[3];

  block.innerHTML = '';

  if (image) {
    block.append(image);
  }

  const content = document.createElement('div');
  content.className = 'banner-content';

  if (heading) {
    content.append(heading);
  }

  if (text) {
    content.append(text);
  }

  if (button) {
    content.append(button);
  }

  block.append(content);
}
