import './Product.scss';
import Div from '../../ui-components/Div/Div';
import Button from '../../ui-components/Button/Button';

interface IProduct {
  category: string;
  name: string;
  prices: { value: { centAmount: number } }[];
  description: string;
  img: { url: string }[];
}

export default class ProductPage {
  private container: Div;
  private breadcrumb: Div;
  private productContainer: Div;
  private imgContainer: Div;
  private descriptionContainer: Div;
  private categoryName: HTMLParagraphElement;
  private productHeader: HTMLHeadingElement;
  private priceContainer: Div;
  private productDescription: HTMLParagraphElement;
  private button: Button;
  private productImg: HTMLImageElement;

  constructor(productInfo: IProduct) {
    this.container = new Div('wrapper__product');
    this.breadcrumb = new Div('breadcrumb');
    this.productContainer = new Div('product__container');
    this.descriptionContainer = new Div('product__description');
    this.breadcrumb.get().textContent = 'BRead';
    this.categoryName = document.createElement('p');
    this.categoryName.textContent = productInfo.category;
    this.categoryName.classList.add('product__category');
    this.productHeader = document.createElement('h2');
    this.productHeader.textContent = productInfo.name;
    this.productHeader.classList.add('product__header');
    this.priceContainer = new Div('price__container');
    // Add SALE if prices>1;
    const pricesElements: HTMLHeadingElement[] = [];
    productInfo.prices.forEach((price) => {
      const priceElement = document.createElement('h3');
      const priceCents = price.value.centAmount;
      const cents = priceCents % 100 === 0 ? '.00' : '.' + (priceCents % 100).toString();
      const priceInDollars = '$' + (priceCents / 100).toString() + cents;
      priceElement.textContent = priceInDollars;
      pricesElements.push(priceElement);
    });
    if (productInfo.prices.length > 1) {
      const saleBlock = document.createElement('h3');
      saleBlock.classList.add('product__sale');
      saleBlock.textContent = 'SALE';
      pricesElements[0].classList.add('price__sale');
      pricesElements[1].classList.add('price__discount');
      this.priceContainer.get().append(saleBlock, pricesElements[0], pricesElements[1]);
    } else {
      this.priceContainer.get().append(pricesElements[0]);
    }

    this.button = new Button('Add to cart', 'button__404');
    this.button.get().onclick = () => console.log('Buy');
    this.productDescription = document.createElement('p');
    this.productDescription.textContent = productInfo.description;
    this.productDescription.classList.add('product__info');
    this.imgContainer = new Div('img__container');
    productInfo.img.forEach((img, idx) => {
      const image = document.createElement('img');
      image.classList.add('product__image');
      image.src = img.url;
      image.alt = productInfo.name + idx;
      this.imgContainer.get().append(image);
    });
    this.productImg = document.createElement('img');
    this.productImg.src = productInfo.img[0].url;
    this.productImg.alt = productInfo.name;
    this.descriptionContainer
      .get()
      .append(
        this.categoryName,
        this.productHeader,
        this.priceContainer.get(),
        this.button.get(),
        this.productDescription,
      );
  }

  render() {
    this.productContainer.get().append(this.imgContainer.get(), this.descriptionContainer.get());
    this.container.get().append(this.breadcrumb.get(), this.productContainer.get());
    return this.container.get();
  }
}
