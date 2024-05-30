import './Modal.scss';

function removeModal() {
  const modalContainer = document.querySelector('.modal__window');
  const modalImage = document.querySelector('.modal-img');
  const overlay = document.querySelector('.overlay');
  modalImage?.classList.remove('modal-img');
  modalContainer?.remove();
  overlay?.remove();
  document.body.classList.remove('modal-open');
}

function addModal(slider: HTMLElement) {
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal__window');
  const modalImage = slider;
  modalImage.classList.add('modal-img');
  modalContainer.append(modalImage);
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  document.body.classList.add('modal-open');
  document.body.append(overlay, modalContainer);

  //Slider

  const imageContainer = modalImage.querySelector('.img__container') as HTMLDivElement;
  const sliderButtons = modalImage.querySelectorAll('.slider-button');
  sliderButtons.forEach((el, idx) => {
    el.addEventListener('click', () => {
      sliderButtons.forEach((btn) => btn.classList.remove('slider-button_active'));
      imageContainer!.style.transform = `translateX(-${idx * 100}%)`;
      el.classList.add('slider-button_active');
      console.log('CLICk');
    });
  });
  overlay.addEventListener('click', () => {
    removeModal();
  });
}

export default addModal;
