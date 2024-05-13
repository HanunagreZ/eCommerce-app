export default class Select {
  private element: HTMLSelectElement;

  constructor(className: string, parentElement?: HTMLElement) {
    this.element = document.createElement('select');
    this.element.classList.add(className);
    if (parentElement) this.render(parentElement);
  }

  get() {
    return this.element;
  }

  addListener(callback: () => void) {
    this.element.addEventListener('change', callback);
  }

  removeListener(callback: () => void) {
    this.element.removeEventListener('change', callback);
  }

  render(parentElement: HTMLElement) {
    parentElement.append(this.element);
  }
}
