import './Product.scss';
import Div from '../../ui-components/Div/Div';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import addModal from './modal';
import addBreadcrumbs from './addBreadCrumbs';
import createPriceElement from './createPriceElement';
import { IProduct } from '../../interfaces/interfaces';
import cartState from '../../states/CartState';
import userState from '../../states/UserState';
import api from '../../Api';
import { getNeededCartData } from '../../utils/GetNeededCartData';
import basket from '../../components/Header/Basket/Basket';
import { MaxQuantity } from '../../data/constants';

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
  private button: HTMLButtonElement;
  private deleteButton: HTMLButtonElement;

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
    //Add Price
    const priceElement = createPriceElement(productInfo.prices.value.centAmount, 'price');
    pricesElements.push(priceElement);
    //Add discount if exist
    if (productInfo.prices.discounted) {
      const saleBlock = document.createElement('h3');
      saleBlock.classList.add('product__sale');
      saleBlock.textContent = 'SALE';
      priceElement.classList.add('price__sale');
      const discountPrice = createPriceElement(productInfo.prices.discounted.value.centAmount, 'price__discount');
      pricesElements.push(discountPrice);
      this.priceContainer.get().append(saleBlock, pricesElements[0], pricesElements[1]);
    } else {
      this.priceContainer.get().append(pricesElements[0]);
    }
    // Buy Button
    this.button = document.createElement('button');
    this.button.classList.add('product__button');
    this.button.textContent = 'Add to cart';

    this.deleteButton = document.createElement('button');
    this.deleteButton.classList.add('product__button', 'hidden');
    this.deleteButton.textContent = 'Remove From Cart';
    // this.deleteBtn = document.createElement('button');
    // this.deleteBtn.classList.add('product__button-delete');

    if (productInfo.isInCart) {
      this.disableButton();
    }

    this.button.addEventListener('click', async () => {
      await this.addToCart(productInfo);
    });
    this.deleteButton.addEventListener('click', async () => {
      await this.removeItemFromCart(productInfo);
    });
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
    if (sliderButtonsArray.length > 1) {
      sliderButtonsArray[0].classList.add('slider-button_active');
    }
    sliderButtonsArray.forEach((el, idx) => {
      el.addEventListener('click', () => {
        sliderButtonsArray.forEach((button) => button.classList.remove('slider-button_active'));
        this.imgContainer.style.transform = `translateX(-${idx * 100}%)`;
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
        this.button,
        this.deleteButton,
        this.productDescription,
      );
  }

  async render() {
    this.productContainer.get().append(this.slider, this.descriptionContainer.get());
    this.container.append(this.breadcrumb.get(), this.productContainer.get());
    this.pageContainer.get().append(this.container);
    return this.pageContainer.get();
  }

  async addToCart(productInfo: IProduct) {
    console.log(productInfo);
    this.disableButton();

    if (cartState.getCartId() === null) {
      const cart = await api.createCart();
      userState.setAnonymousCartId(cart.id);
      userState.setAnonymousCartVersion(cart.version);
    }
    const response = await api.addLineItem(
      String(cartState.getCartId()),
      Number(cartState.getCartVersion()),
      productInfo.sku,
    );

    console.log(response);
    const data = getNeededCartData(response);
    basket.reRenderCount(data.totalQuantity);
  }

  disableButton() {
    this.button.innerText = 'Already In Cart';
    this.button.disabled = true;

    this.deleteButton.classList.remove('hidden');
  }

  enableButton() {
    this.button.innerText = 'Add to cart';
    this.button.disabled = false;

    this.deleteButton.classList.add('hidden');
  }

  async removeItemFromCart(productInfo: IProduct) {
    const cartResponse = await api.getCartByID(String(cartState.getCartId()));
    const lineitems = getNeededCartData(cartResponse).lineItems;
    let id = '';
    lineitems.forEach((el) => {
      if (el.name === productInfo.name) id = el.id;
    });
    await api.removeLineItem(String(cartState.getCartId()), Number(cartState.getCartVersion()), id, MaxQuantity);

    this.enableButton();
  }
}
