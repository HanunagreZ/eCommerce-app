import './Cart.scss';
import Div from '../../ui-components/Div/Div';
import Button from '../../ui-components/Button/Button';
import api from '../../Api';
import userState from '../../states/UserState';
import cartState from '../../states/CartState';
import CartItem from './CartItem';
import Input from '../../ui-components/Input/Input';
import { CartItemData, ICartData } from '../../interfaces/interfaces';
import Span from '../../ui-components/Span/Span';
import { getNeededCartData } from '../../utils/GetNeededCartData';

export class Cart {
  private container: Div;
  private itemsContainer: Div;
  private detailsContainer: Div;
  private costContainer: Div;
  private totalQuantity: Span;
  private subtotal: Span;
  private discounts: Span;
  private total: Span;
  private cartItems: CartItem[] = [];

  constructor() {
    this.container = new Div('cart');
    this.itemsContainer = new Div('cart__items-container');
    this.detailsContainer = new Div('cart__details-container');
    this.costContainer = new Div('cart__cost-container');
    this.totalQuantity = new Span('', 'cart__details-cost');
    this.subtotal = new Span('', 'cart__details-cost');
    this.discounts = new Span('', 'cart__details-cost');
    this.total = new Span('', 'cart__details-cost');
  }

  render() {
    // кнопки для тестирования
    //const itemsContainer = new Div('cart__items-container', this.container.get());
    this.container.get().innerHTML = '';
    this.itemsContainer.render(this.container.get());
    this.detailsContainer.render(this.container.get());

    new Button('Clear Cart', 'cart__clear-btn', this.container.get()).addListener(() => this.clearCart());

    new Button('Get Cart by ID', 'cart', this.itemsContainer.get()).addListener(async () => {
      const response = await api.getCartByID(cartState.getCartId());
      const cartData: ICartData = getNeededCartData(response);

      await this.renderItemsContainer(cartData);
      await this.renderDetailsContainer(cartData);
    });

    new Button('addDiscountCode', 'cart', this.detailsContainer.get()).addListener(async () => {
      const response = await api.addDiscountCode(
        String(userState.getAnonymousCartId()),
        Number(userState.getAnonymousCartVersion()),
        'FUNKOALL5',
      );
      console.log(response);
    });

    return this.container.get();
  }

  async renderItemsContainer(cartData: ICartData) {
    this.itemsContainer.get().innerHTML = '';

    // this.renderItemsContainer();

    cartData.lineItems.map((item) => {
      const newItem = new CartItem(item);
      this.cartItems.push(newItem);
      this.itemsContainer.get().append(newItem.render());
    });
  }

  async renderDetailsContainer(cartData: ICartData) {
    this.detailsContainer.get().innerHTML = '';
    //promo container
    const promoContainer = new Div('cart__promo-container', this.detailsContainer.get());
    const promoForm = document.createElement('form');
    promoForm.classList.add('cart__promo-form');

    const promo = new Input('Enter promo code here', 'cart__promo-input', promoForm);
    new Button('Apply', 'cart__promo-btn', promoForm).addListener(async (e?: Event) => {
      await this.applyPromo(promo.get().value, e);
    });

    promoContainer.get().append(promoForm);

    this.costContainer.render(this.detailsContainer.get());
    this.renderCostContainer(cartData);
  }

  renderCostContainer(cartData: ICartData) {
    this.costContainer.get().innerHTML = '';

    new Div('cart__cost-line', this.costContainer.get())
      .get()
      .append(
        new Span('Summary', 'cart__details-title', this.costContainer.get()).get(),
        (this.totalQuantity.get().innerText = `${cartData.totalQuantity} items`),
      );

    new Div('cart__cost-line', this.costContainer.get())
      .get()
      .append(
        new Span('Subtotal', 'cart__details-title', this.costContainer.get()).get(),
        (this.subtotal.get().innerText = `$ ${this.calculateSubtotal(cartData.lineItems).toFixed(2)}`),
      );
    new Div('cart__cost-line', this.costContainer.get())
      .get()
      .append(
        new Span('Shipping', 'cart__details-title', this.costContainer.get()).get(),
        new Span('$ 5.00', 'cart__details-cost').get(),
      );
    new Div('cart__cost-line', this.costContainer.get())
      .get()
      .append(
        new Span('Discounts and promo', 'cart__details-title', this.costContainer.get()).get(),
        (this.discounts.get().innerText = `-$ ${(this.calculateSubtotal(cartData.lineItems) - cartData.totalPrice).toFixed(2)}`),
      );
    new Div('cart__cost-line', this.costContainer.get())
      .get()
      .append(
        new Span('Total', 'cart__details-title', this.costContainer.get()).get(),
        (this.total.get().innerText = `$ ${(cartData.totalPrice + 5).toFixed(2)}`),
      );
  }
  calculateSubtotal(lineItems: CartItemData[]) {
    let sum = 0;
    lineItems.forEach((element) => {
      sum += element.price * element.quantity;
    });
    return sum;
  }
  async applyPromo(value: string, e: Event | undefined) {
    e?.preventDefault();
    if (value !== '') {
      const response = await api.addDiscountCode(
        String(userState.getAnonymousCartId()),
        Number(userState.getAnonymousCartVersion()),
        value.toUpperCase(),
      );
      if (response) {
        console.log(response);
      }
    }
  }

  clearCart() {
    console.log(this.cartItems);
    this.cartItems.forEach(async (item) => {
      await item.removeItem();
    });
  }
}

const cart = new Cart();

export default cart;
