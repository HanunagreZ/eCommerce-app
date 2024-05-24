import { IProductCard } from '../../interfaces/interfaces';
import Button from '../../ui-components/Button/Button';
import Div from '../../ui-components/Div/Div';
import Img from '../../ui-components/Img/Img';
import Span from '../../ui-components/Span/Span';

export class ProductCard {
  constructor(productData: IProductCard, parentElement?: HTMLElement) {
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
    new Button('Add to cart', 'catalog__card-btn', card.get());
    return card.get();
  }
}
