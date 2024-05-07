export default class Span {
  private element: HTMLSpanElement;

  constructor(text: string, className: string, parentElement: HTMLElement) {
    this.element = document.createElement('span');
    this.element.classList.add(className);
    this.element.innerText = text;
    this.render(parentElement);
  }

  get() {
    return this.element;
  }

  render(parentElement: HTMLElement) {
    parentElement.append(this.element);
  }
}
