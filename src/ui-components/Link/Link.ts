export default class Link {
  private element: HTMLAnchorElement;

  constructor(href: string, text: string, parentElement: HTMLElement) {
    this.element = document.createElement('a');
    this.element.classList.add('link');
    this.element.href = href;
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
