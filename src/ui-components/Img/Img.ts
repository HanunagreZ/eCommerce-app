export default class Img {
  private element: HTMLImageElement;

  constructor(className: string, src: string, alt?: string, parentElement?: HTMLElement) {
    this.element = document.createElement('img');
    this.element.classList.add(className);
    this.element.setAttribute('src', src);
    if (alt) this.element.setAttribute('alt', alt);
    if (parentElement) this.render(parentElement);
  }

  get() {
    return this.element;
  }

  render(parentElement: HTMLElement) {
    parentElement.append(this.element);
  }
}
