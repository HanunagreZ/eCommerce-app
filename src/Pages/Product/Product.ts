import './Product.scss';
import Div from '../../ui-components/Div/Div';
import Button from '../../ui-components/Button/Button';

interface ProductInfo {
  category: string;
  header: string;
  price: string;
  description: string;
  imgUrl: string;
}

export default class ProductPage {
  private container: Div;
  private categoryName: HTMLParagraphElement;
  private productHeader: HTMLHeadingElement;
  private price: HTMLHeadingElement;
  private productDescription: HTMLParagraphElement;
  private button: Button;
  private productImg: HTMLImageElement;

  constructor(productInfo: ProductInfo) {
    this.container = new Div('wrapper__product');
    this.categoryName = document.createElement('p');
    this.categoryName.textContent = productInfo.category;
    this.productHeader = document.createElement('h2');
    this.productHeader.textContent = productInfo.header;
    this.price = document.createElement('h3');
    this.price.textContent = productInfo.price;
    this.button = new Button('Add to cart', 'button__404');
    this.button.get().onclick = () => console.log('Buy');
    this.productDescription = document.createElement('p');
    this.productDescription.textContent = productInfo.description;
    this.productImg = document.createElement('img');
    this.productImg.src = productInfo.imgUrl;
    this.productImg.alt = productInfo.header;
  }

  render() {
    this.container
      .get()
      .append(
        this.categoryName,
        this.productHeader,
        this.price,
        this.button.get(),
        this.productDescription,
        this.productImg,
      );
    return this.container.get();
  }
}
