import Span from '../../../ui-components/Span/Span';

class Basket {
  private element: HTMLDivElement;
  private basketIcon: HTMLImageElement;
  private basketCount: Span;

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('header__basket');
    this.basketIcon = document.createElement('img');
    this.basketIcon.classList.add('header__basket-icon');
    this.basketIcon.src = 'assets/icons/iconBasket.svg';
    this.element.append(this.basketIcon);
    this.basketCount = new Span('0', 'header__basket-count', this.element);
  }

  get() {
    return this.element;
  }

  reRenderCount(count: number) {
    this.basketCount.get().textContent = count.toString();
  }

  render(parentElement: HTMLElement) {
    parentElement.append(this.element);
  }
}

const basket = new Basket();
export default basket;
