import { IProductCard } from '../../interfaces/interfaces';
import Button from '../../ui-components/Button/Button';
import Div from '../../ui-components/Div/Div';
import Img from '../../ui-components/Img/Img';
import Span from '../../ui-components/Span/Span';

export class Product {
  constructor(productData: IProductCard, parentElement?: HTMLElement) {
    if (parentElement) parentElement.append(this.render(productData));
  }

  render(productData: IProductCard) {
    const card = new Div('catalog__prooduct-card');
    new Img('catalog__card-img', productData.imgSrc, 'product_image', card.get());
    new Span(productData.category, 'catalog__product-category', card.get());
    new Span(productData.name, 'catalog__product-name', card.get());
    new Span(productData.price, 'catalog__product-price', card.get());
    new Button('Add to cart', 'catalog__card-btn', card.get());
    return card.get();
  }
}
