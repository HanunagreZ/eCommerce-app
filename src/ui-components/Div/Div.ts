export default class Div {
  private element: HTMLDivElement;

  constructor(className: string, parentElement?: HTMLElement) {
    this.element = document.createElement('div');
    this.element.classList.add(className);
    if (parentElement) this.render(parentElement);
  }

  get() {
    return this.element;
  }

  render(parentElement: HTMLElement) {
    parentElement.append(this.element);
  }
}
