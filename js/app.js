// Interacciones locales; este archivo no realiza solicitudes de red.
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const menuItems = [...document.querySelectorAll('.menu-item[data-category]')];
  filterButtons.forEach((button) => button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    menuItems.forEach((item) => {
      item.hidden = selected !== 'todos' && item.dataset.category !== selected;
    });
  }));

  const form = document.querySelector('#contact-form');
  if (form) {
    const status = document.querySelector('#form-status');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = form.elements.name.value.trim();
      const email = form.elements.email.value.trim();
      const message = form.elements.message.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let error = '';
      if (name.length < 2) error = 'Escribe tu nombre (al menos 2 caracteres).';
      else if (!emailPattern.test(email)) error = 'Escribe un correo con formato válido.';
      else if (message.length < 10) error = 'El mensaje debe tener al menos 10 caracteres.';
      status.textContent = error || '¡Listo! Los datos pasaron la validación. Esta demostración no envía ni guarda información.';
      status.classList.toggle('error', Boolean(error));
      status.classList.toggle('success', !error);
      if (!error) form.reset();
    });
  }

  const tiles = document.querySelectorAll('[data-lightbox]');
  if (tiles.length && 'HTMLDialogElement' in window) {
    const dialog = document.createElement('dialog');
    dialog.className = 'gallery-dialog';
    const close = document.createElement('button');
    close.type = 'button';
    close.textContent = 'Cerrar ×';
    close.addEventListener('click', () => dialog.close());
    const image = document.createElement('img');
    const caption = document.createElement('p');
    dialog.append(close, image, caption);
    document.body.append(dialog);
    tiles.forEach((tile) => tile.addEventListener('click', () => {
      if (tile.dataset.lightbox.startsWith('img/')) {
        image.src = tile.dataset.lightbox;
        image.style.content = '';
      } else {
        const source = tile.querySelector('img');
        if (source) image.style.content = getComputedStyle(source).content;
      }
      image.alt = tile.dataset.alt || '';
      caption.textContent = tile.dataset.alt || '';
      dialog.showModal();
    }));
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
  }
});
