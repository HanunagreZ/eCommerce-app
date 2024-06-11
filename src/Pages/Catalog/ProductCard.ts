import router from '../..';
import api from '../../Api';
import basket from '../../components/Header/Basket/Basket';
import { catalogTitles } from '../../data/data';
import { IProductCard } from '../../interfaces/interfaces';
import cartState from '../../states/CartState';
import userState from '../../states/UserState';
import Button from '../../ui-components/Button/Button';
import Div from '../../ui-components/Div/Div';
import Img from '../../ui-components/Img/Img';
import Span from '../../ui-components/Span/Span';
import { getNeededCartData } from '../../utils/GetNeededCartData';

export class ProductCard {
  private cartBtn: Button;
  constructor(productData: IProductCard, parentElement?: HTMLElement) {
    this.cartBtn = new Button(catalogTitles.cartBtn, 'catalog__cart-btn');
    this.cartBtn.addListener(async () => {
      await this.addToCart(productData);
    });
    if (parentElement) parentElement.append(this.render(productData));
  }

  render(productData: IProductCard) {
    const card = new Div('catalog__prooduct-card');
    new Img('catalog__card-img', productData.imgSrc, 'product_image', card.get());
    new Span(productData.category, 'catalog__product-category', card.get());
    new Span(productData.name, 'catalog__product-name', card.get());
    const priceContainer = new Div('catalog__product-price-container', card.get());
    if (productData.discountedPrice) {
      new Span(
        `$${(productData.discountedPrice / 100).toFixed(2)}`,
        'catalog__product-discounted-price',
        priceContainer.get(),
      );
      new Span(`$${(productData.price / 100).toFixed(2)}`, 'catalog__product-price', priceContainer.get())
        .get()
        .classList.add('catalog__old-price');
    } else {
      new Span(`$${(productData.price / 100).toFixed(2)}`, 'catalog__product-price', priceContainer.get());
    }

    this.cartBtn.get().disabled = false;
    this.cartBtn.render(card.get());

    if (productData.isInCart) this.disableBtn();

    card.get().addEventListener('click', (e) => {
      const clickedElement = e.target as HTMLElement;
      if (!clickedElement.classList.contains('catalog__cart-btn'))
        if (productData.productType === 'pop') {
          router.navigateTo(
            `/catalog/${productData.productType}/${productData.category.toLowerCase().replace(' ', '-')}/${productData.key}`,
          );
        } else {
          router.navigateTo(`/catalog/${productData.productType}/${productData.key}`);
        }
    });

    return card.get();
  }

  async addToCart(productData: IProductCard) {
    // let cartId: string = '';
    // let cartVersion: number;
    // let res;
    this.disableBtn();
    if (cartState.getCartId() === 'null') {
      const cart = await api.createCart();
      userState.setAnonymousCartId(cart.id);
      userState.setAnonymousCartVersion(cart.version);
    }
    const response = await api.addLineItem(cartState.getCartId(), cartState.getCartVersion(), productData.sku);

    const data = getNeededCartData(response);
    basket.reRenderCount(data.totalQuantity);
  }

  disableBtn() {
    this.cartBtn.get().disabled = true;
    this.cartBtn.get().innerText = catalogTitles.inCartBtn;
  }
}
