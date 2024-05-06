export default class Input {
  private element: HTMLInputElement;

  constructor(placeholder: string, className: string, parentElement: HTMLElement) {
    this.element = document.createElement('input');
    this.element.classList.add(className);
    this.element.setAttribute('type', 'text');
    this.element.setAttribute('placeholder', placeholder);
    this.render(parentElement);
  }

  get() {
    return this.element;
  }

  addListener(callback: () => void) {
    this.element.addEventListener('input', callback);
  }

  render(parentElement: HTMLElement) {
    parentElement.append(this.element);
  }
}
