export default class Li {
  private element: HTMLLIElement;

  constructor(parentElement: HTMLElement) {
    this.element = document.createElement('li');
    this.element.classList.add('header__nav-item');
    this.render(parentElement);
  }

  get() {
    return this.element;
  }

  render(parentElement: HTMLElement) {
    parentElement.append(this.element);
  }
}
