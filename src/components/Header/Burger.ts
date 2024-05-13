import Div from '../../ui-components/Div/Div';
import NavUnauth from './NavUnauth';
import NavAuth from './NavAuth';

class Burger {
  private element: HTMLDivElement;
  private burgerLine1: HTMLImageElement;
  private burgerLine2: HTMLImageElement;
  private burgerLine3: HTMLImageElement;
  private popup: Div;
  private navUnauthPopup: NavUnauth;
  private navAuthPopup: NavAuth;
  private state: number;

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('header__burger');
    this.burgerLine1 = document.createElement('img');
    this.burgerLine1.src = 'assets/icons/burgerLine.svg';
    this.burgerLine1.classList.add('header__burger-line1');
    this.burgerLine2 = document.createElement('img');
    this.burgerLine2.src = 'assets/icons/burgerLine.svg';
    this.burgerLine2.classList.add('header__burger-line2');
    this.burgerLine3 = document.createElement('img');
    this.burgerLine3.src = 'assets/icons/burgerLine.svg';
    this.burgerLine3.classList.add('header__burger-line3');
    this.popup = new Div('burger__popup', this.element);
    this.clickHamburger();
    this.navUnauthPopup = new NavUnauth('header__nav_popup');
    this.navAuthPopup = new NavAuth('header__nav_popup');
    this.state = 0;
  }

  get() {
    return this.element;
  }

  clickHamburger() {
    this.element.addEventListener('click', () => {
      this.burgerLine1.classList.toggle('header__burger-line1_active');
      this.burgerLine2.classList.toggle('header__burger-line2_active');
      this.burgerLine3.classList.toggle('header__burger-line3_active');
      this.popup.get().classList.toggle('burger__popup_active');
    });
  }

  render(parentElement: HTMLElement) {
    this.element.append(this.burgerLine1, this.burgerLine2, this.burgerLine3);
    parentElement.append(this.element);
  }

  reRenderPopupNav() {
    if (this.state === 0) {
      this.navUnauthPopup.render(this.popup.get());
      this.state = 1;
      return;
    }
    if (this.state === 1) {
      this.navUnauthPopup.get().replaceWith(this.navAuthPopup.get());
      this.state = 2;
      return;
    }
    if (this.state === 2) {
      this.navAuthPopup.get().replaceWith(this.navUnauthPopup.get());
      this.state = 1;
      return;
    }
  }
}

const burger = new Burger();
export default burger;
