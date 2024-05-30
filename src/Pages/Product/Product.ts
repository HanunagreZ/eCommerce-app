import './Product.scss';
import Div from '../../ui-components/Div/Div';
import Button from '../../ui-components/Button/Button';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import addModal from './modal';

interface IProduct {
  category: string;
  name: string;
  prices: { value: { centAmount: number } }[];
  description: string;
  img: { url: string }[];
}

function addBreadcrumbs(category: string) {
  const hrefs = ['/', 'catalog'];
  const text = ['Funko', 'Catalog'];
  if (category === 'Accessories') {
    hrefs.push('catalog/accessories');
    text.push('Accessories');
  } else {
    hrefs.push('catalog/pop');
    hrefs.push('catalog/pop/' + category.toLowerCase());
    text.push('Pop');
    const categ = category[0].toUpperCase() + category.slice(1, category.length);
    text.push(categ);
  }
  return { hrefs, text };
}

export default class ProductPage {
  private pageContainer: Div;
  private container: HTMLDivElement;
  private breadcrumb: Div;
  private productContainer: Div;
  private imgContainer: HTMLDivElement;
  private slider: HTMLDivElement;
  private descriptionContainer: Div;
  private categoryName: HTMLParagraphElement;
  private productHeader: HTMLHeadingElement;
  private priceContainer: Div;
  private productDescription: HTMLParagraphElement;
  private button: Button;

  constructor(productInfo: IProduct) {
    this.pageContainer = new Div('product-page');
    this.container = document.createElement('div');
    this.container.classList.add('wrapper__product');
    const { hrefs, text } = addBreadcrumbs(productInfo.category);
    this.breadcrumb = new Breadcrumbs().render({ href: hrefs, text: text }, this.container);
    this.productContainer = new Div('product__container');
    this.descriptionContainer = new Div('product__description');
    this.categoryName = document.createElement('p');
    this.categoryName.textContent = productInfo.category;
    this.categoryName.classList.add('product__category');
    this.productHeader = document.createElement('h2');
    this.productHeader.textContent = productInfo.name;
    this.productHeader.classList.add('product__header');
    //Prices
    this.priceContainer = new Div('price__container');
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
    // Buy Button
    this.button = new Button('Add to cart', 'button__404');
    this.button.get().onclick = () => console.log('Buy');
    // Product Description
    this.productDescription = document.createElement('p');
    this.productDescription.textContent = productInfo.description;
    this.productDescription.classList.add('product__info');
    //Images
    this.slider = document.createElement('div');
    this.slider.classList.add('product__slider');
    this.imgContainer = document.createElement('div');
    this.imgContainer.classList.add('img__container');
    const sliderButtons = document.createElement('div');
    sliderButtons.classList.add('slider__buttons');
    const sliderButtonsArray: HTMLButtonElement[] = [];
    const imgArray: HTMLImageElement[] = [];
    productInfo.img.forEach((img, idx) => {
      const image = document.createElement('img');
      image.classList.add('product__image');
      image.src = img.url;
      image.alt = productInfo.name + idx;
      this.imgContainer.append(image);
      const sliderButton = document.createElement('button');
      sliderButton.classList.add(`slider-button${idx}`);
      sliderButton.classList.add('slider-button');
      sliderButtonsArray.push(sliderButton);
      imgArray.push(image);
      sliderButtons.append(sliderButton);
    });
    //Slider Mechanic
    console.log(sliderButtons, 'sl vu');
    if (sliderButtonsArray.length > 1) {
      sliderButtonsArray[0].classList.add('slider-button_active');
    }
    sliderButtonsArray.forEach((el, idx) => {
      el.addEventListener('click', (e) => {
        sliderButtonsArray.forEach((button) => button.classList.remove('slider-button_active'));
        console.log(this.imgContainer.style.transform);
        this.imgContainer.style.transform = `translateX(-${idx * 100}%)`;
        console.log(e);
        el.classList.add('slider-button_active');
      });
    });
    // Modal Mechanic
    imgArray.forEach((img) => {
      img.addEventListener('click', () => {
        const image = this.slider.cloneNode(true) as HTMLElement;
        addModal(image);
      });
    });

    this.slider.append(this.imgContainer, sliderButtons);

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
    this.productContainer.get().append(this.slider, this.descriptionContainer.get());
    this.container.append(this.breadcrumb.get(), this.productContainer.get());
    this.pageContainer.get().append(this.container);
    return this.pageContainer.get();
  }
}
