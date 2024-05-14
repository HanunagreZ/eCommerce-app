export default class Button {
  private element: HTMLButtonElement;

  //implement parentElement as optional parameter for creating element without rendering
  constructor(text: string, className: string, parentElement?: HTMLElement) {
    this.element = document.createElement('button');
    this.element.classList.add(className);
    this.element.innerText = text;
    if (parentElement) this.render(parentElement);
  }

  get() {
    return this.element;
  }

  addListener(callback: (e: Event) => void) {
    this.element.addEventListener('click', callback);
  }

  render(parentElement: HTMLElement) {
    parentElement.append(this.element);
  }
}
