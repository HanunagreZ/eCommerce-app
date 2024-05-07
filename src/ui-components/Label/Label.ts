export default class Label {
  private element: HTMLLabelElement;

  constructor(text: string, className: string, parentElement: HTMLElement) {
    this.element = document.createElement('label');
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
