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
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { breadProps, cartTitles, promocodes } from '../../data/data';
import Img from '../../ui-components/Img/Img';
import router from '../..';

export class Cart {
  private container: Div;
  private itemsContainer: Div;
  private detailsContainer: Div;
  private usedPromo: Div;
  private costContainer: Div;
  private totalQuantity: Span;
  private subtotal: Span;
  private discounts: Span;
  private total: Span;
  private cartItems: CartItem[] = [];

  constructor() {
    this.container = new Div('cart__container');
    this.itemsContainer = new Div('cart__items-container');
    this.detailsContainer = new Div('cart__details-container');
    this.usedPromo = new Div('cart__used-promo');
    this.costContainer = new Div('cart__cost-container');
    this.totalQuantity = new Span('', 'cart__details-quantity');
    this.subtotal = new Span('', 'cart__details-cost');
    this.discounts = new Span('', 'cart__details-cost');
    this.total = new Span('', 'cart__details-cost');
  }

  async render() {
    const cartWrapper = new Div('cart');
    new Breadcrumbs().render(breadProps.cart, new Div('breadcrumbs', cartWrapper.get()).get());
    this.container.render(cartWrapper.get());

    this.renderCartState();
    return cartWrapper.get();
  }

  async renderCartState() {
    if (cartState.getCartId() === 'null') {
      await this.renderEmptyPage();
    } else {
      const response = await api.getCartByID(cartState.getCartId());
      const cartData: ICartData = getNeededCartData(response);
      if (cartData.lineItems.length === 0) {
        this.renderEmptyPage();
      } else {
        await this.renderCustomerCart(cartData);
      }

      // await this.renderCustomerCart();
    }
  }

  async renderCustomerCart(cartData: ICartData) {
    this.container.get().innerHTML = '';
    const titleContainer = new Div('cart__title-container', this.container.get());
    const title = document.createElement('h1');
    title.classList.add('cart__title');
    title.innerText = cartTitles.title;
    titleContainer.get().append(title);

    new Button('Clear Cart', 'cart__clear-btn', titleContainer.get()).addListener(() => this.clearCart());

    const colTitles = new Div('cart__col-titles-container', this.container.get());
    for (const key in cartTitles.colTitles) {
      new Span(cartTitles.colTitles[key as keyof typeof cartTitles.colTitles], 'cart__col-title', colTitles.get());
      // if (Object.prototype.hasOwnProperty.call(cartTitles.colTitles, key)) {
      //   const element = cartTitles.colTitles[key as keyof typeof cartTitles.colTitles];
      //   cartTitles.colTitles.
      // }
    }

    new Div('cart__products-container', this.container.get())
      .get()
      .append(this.itemsContainer.get(), this.detailsContainer.get());
    // const response = await api.getCartByID(cartState.getCartId());
    // const cartData: ICartData = getNeededCartData(response);

    await this.renderItemsContainer(cartData);
    await this.renderDetailsContainer(cartData);
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
    new Div('cart__promo-title', promoContainer.get()).get().innerHTML = cartTitles.promoTitle;

    this.usedPromo.render(promoContainer.get());
    this.usedPromo.get().innerHTML = '';
    const promoText = Object.keys(promocodes).find(
      (k) => promocodes[k as keyof typeof promocodes] === cartData.promoCode,
    );
    if (promoText) {
      this.usedPromo.get().innerHTML = promoText;
    }

    const promoForm = document.createElement('form');
    promoForm.classList.add('cart__promo-form');

    const promo = new Input(cartTitles.promoPlaceholder, 'cart__promo-input', promoForm);
    new Button(cartTitles.promoBtn, 'cart__promo-btn', promoForm).addListener(async (e?: Event) => {
      await this.applyPromo(promo.get().value, e);
      promo.get().value = '';
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
        (this.subtotal.get().innerText = `$${this.calculateSubtotal(cartData.lineItems).toFixed(2)}`),
      );
    new Div('cart__cost-line', this.costContainer.get())
      .get()
      .append(
        new Span('Shipping', 'cart__details-title', this.costContainer.get()).get(),
        new Span('$5.00', 'cart__details-cost').get(),
      );
    new Div('cart__cost-line', this.costContainer.get())
      .get()
      .append(
        new Span('Discounts and promo', 'cart__details-title', this.costContainer.get()).get(),
        (this.discounts.get().innerText = `-$${(this.calculateSubtotal(cartData.lineItems) - cartData.totalPrice).toFixed(2)}`),
      );
    new Div('cart__cost-line', this.costContainer.get())
      .get()
      .append(
        new Span('Total', 'cart__details-title', this.costContainer.get()).get(),
        (this.total.get().innerText = `$${(cartData.totalPrice + 5).toFixed(2)}`),
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
      // if (userState.getPromo() !== null) {
      //   api.removeDiscountCode(cartState.getCartId(), cartState.getCartVersion(), String(userState.getPromo()));
      // }
      const response = await api.addDiscountCode(
        String(cartState.getCartId()),
        Number(cartState.getCartVersion()),
        value.toUpperCase(),
      );
      if (response.response !== undefined && response.response.status === 400) {
        //TODO add modal with incorrect promo
        console.log('incorrect promo');
      } else {
        console.log(response);
        const data = getNeededCartData(response);

        this.usedPromo.get().innerHTML = '';
        const promoText = Object.keys(promocodes).find(
          (k) => promocodes[k as keyof typeof promocodes] === data.promoCode,
        );
        if (promoText) {
          this.usedPromo.get().innerHTML = promoText;
        }

        userState.setPromo(data.promoCode);
        this.renderCostContainer(data);
      }
    }
  }

  async clearCart() {
    await api.deleteCartById();

    if (userState.getCustomerCartId()) {
      console.log('customer');
      const newCart = await api.createCart();
      const customerCart = await api.setCustomerIdForCart(newCart.id, newCart.version, String(userState.getUserId()));

      userState.setCustomerCartId(customerCart.id);
    } else {
      const cart = await api.createCart();
      userState.setAnonymousCartId(cart.id);
      userState.setAnonymousCartVersion(cart.version);
    }
    this.renderEmptyPage();
  }

  async renderEmptyPage() {
    this.container.get().innerHTML = '';
    const titleContainer = new Div('cart__title-container', this.container.get());
    const title = document.createElement('h1');
    title.classList.add('cart__title');
    title.innerText = cartTitles.title;
    titleContainer.get().append(title);
    const emptyContainer = new Div('cart__empty-container', this.container.get());
    new Img('cart__empty-img', './../../assets/cart/emptyCart.png', 'empty cart image', emptyContainer.get());
    new Div('cart__empty-text', emptyContainer.get()).get().innerHTML = cartTitles.empty;
    new Button(cartTitles.catalogBtn, 'cart__shopping-btn', emptyContainer.get()).addListener(() => {
      router.navigateTo('/catalog');
    });
  }
}

const cart = new Cart();

export default cart;
