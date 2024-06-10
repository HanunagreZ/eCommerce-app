import api from '../../Api';
import { MaxQuantity } from '../../data/constants';
import { CartItemData } from '../../interfaces/interfaces';
import cartState from '../../states/CartState';
import Button from '../../ui-components/Button/Button';
import Div from '../../ui-components/Div/Div';
import Img from '../../ui-components/Img/Img';
import Select from '../../ui-components/Select/Select';
import Span from '../../ui-components/Span/Span';
import { getNeededCartData } from '../../utils/GetNeededCartData';
import cart from './Cart';

export default class CartItem {
  data: CartItemData;
  container: Div;
  quantity: Select;
  price: Span;
  discountedPrice: Span | undefined;
  constructor(data: CartItemData) {
    this.data = data;
    this.container = new Div('cart__item');
    this.quantity = new Select('cart__item-quantity');
    this.quantity.addListener(() => this.changeQuantity());
    this.price = new Span(`$${(data.price * this.data.quantity).toFixed(2)}`, 'cart__item-price');
    this.discountedPrice = data.discountedPrice
      ? new Span(`$${(data.discountedPrice * this.data.quantity).toFixed(2)}`, 'cart__item-discounted-price')
      : undefined;
  }

  render() {
    new Img('cart__item-img', this.data.imgUrl, 'product image', this.container.get());
    new Span(this.data.name, 'cart__item-name', this.container.get());

    for (let i = 1; i <= MaxQuantity; i++) {
      const option = document.createElement('option');
      option.innerText = `${i}`;

      this.quantity.get().append(option);

      if (i === this.data.quantity) option.selected = true;
    }
    this.quantity.render(this.container.get());
    const priceContiner = new Div('cart__price-container', this.container.get());
    if (this.data.discountedPrice) {
      this.price.get().classList.add('old');
      this.price.render(priceContiner.get());

      this.discountedPrice?.render(priceContiner.get());
    } else {
      this.price.render(priceContiner.get());
    }

    new Button('', 'cart__item-remove-btn', this.container.get()).addListener(() => this.removeItem());
    return this.container.get();
  }

  async changeQuantity() {
    const newQuantity = Number(this.quantity.get().value);
    this.price.get().innerText = `$${(this.data.price * newQuantity).toFixed(2)}`;
    if (this.discountedPrice && this.data.discountedPrice)
      this.discountedPrice.get().innerText = `$${(this.data.discountedPrice * newQuantity).toFixed(2)}`;
    this.data.quantity = newQuantity;
    const response = await api.changeLineItemQuantity(
      cartState.getCartId(),
      cartState.getCartVersion(),
      this.data.id,
      newQuantity,
    );

    const data = getNeededCartData(response);
    cart.renderCostContainer(data);
    // cartState.getCartData();
  }

  async removeItem() {
    const response = await api.removeLineItem(
      cartState.getCartId(),
      cartState.getCartVersion(),
      this.data.id,
      this.data.quantity,
    );
    this.container.get().innerHTML = '';
    this.container.get().remove();
    console.log(response);
    const data = getNeededCartData(response);

    cart.renderCostContainer(data);
  }
}
