export default class Div {
  private element: HTMLElement;

  constructor(className: string, parentElement: HTMLElement) {
    this.element = document.createElement('div');
    this.element.classList.add(className);
    this.render(parentElement);
  }

  get() {
    return this.element;
  }

  render(parentElement: HTMLElement) {
    parentElement.append(this.element);
  }
}
