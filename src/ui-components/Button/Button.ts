export default class Button {
  private element: HTMLElement;

  constructor(text: string, className: string, parentElement: HTMLElement) {
    this.element = document.createElement('button');
    this.element.classList.add(className);
    this.element.innerText = text;
    this.render(parentElement);
  }

  get() {
    return this.element;
  }

  addListener(callback: () => void) {
    this.element.addEventListener('click', callback);
  }

  render(parentElement: HTMLElement) {
    parentElement.append(this.element);
  }
}
