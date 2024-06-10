import router from '../../..';
import api from '../../../Api';
import cart from '../../../Pages/Cart/Cart';
import userState from '../../../states/UserState';
import Span from '../../../ui-components/Span/Span';

class Basket {
  private element: HTMLDivElement;
  private basketIcon: HTMLImageElement;
  private basketCount: Span;

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('header__basket');

    this.element.addEventListener('click', async () => {
      router.navigateTo('/cart');
      await cart.renderCartState();
    });

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

  async render(parentElement: HTMLElement) {
    this.basketCount.get().textContent = '0';
    const cartId = userState.getAnonymousCartId()
      ? String(userState.getAnonymousCartId())
      : String(userState.getCustomerCartId());
    if (cartId !== 'null') {
      const response = await api.getCartByID(cartId);
      if (response.totalLineItemQuantity) {
        this.reRenderCount(response.totalLineItemQuantity);
      }
    }
    parentElement.append(this.element);
  }
}

const basket = new Basket();
export default basket;
