import Div from '../../../ui-components/Div/Div';
import NavUnauth from '../Nav/NavUnauth';
import NavAuth from '../Nav/NavAuth';
import userState from '../../../states/UserState';

class Burger {
  private element: HTMLDivElement;
  private divBurgerLines: Div;
  private burgerLine1: HTMLImageElement;
  private burgerLine2: HTMLImageElement;
  private burgerLine3: HTMLImageElement;
  private popup: Div;
  private navPopupDiv: Div;
  private navUnauthPopup: NavUnauth;

  constructor() {
    this.element = document.createElement('div');
    this.divBurgerLines = new Div('header__divBurgerLines', this.element);
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
    this.navPopupDiv = new Div('header__nav_popupDiv', this.popup.get());
    this.navUnauthPopup = new NavUnauth('header__nav_popup');
  }

  get() {
    return this.element;
  }

  clickHamburger() {
    this.burgerLine1.classList.toggle('header__burger-line1_active');
    this.burgerLine2.classList.toggle('header__burger-line2_active');
    this.burgerLine3.classList.toggle('header__burger-line3_active');
    this.popup.get().classList.toggle('burger__popup_active');
  }

  render(parentElement: HTMLElement) {
    this.divBurgerLines.get().addEventListener('click', () => {
      this.clickHamburger();
    });

    this.navUnauthPopup.get().addEventListener('click', (e) => {
      if (e.target !== this.navUnauthPopup.get()) {
        this.clickHamburger();
      }
    });

    this.divBurgerLines.get().append(this.burgerLine1, this.burgerLine2, this.burgerLine3);
    parentElement.append(this.element);
  }
  renderPopupNav() {
    if (userState.getUserName()) {
      const navAuthPopup = new NavAuth('header__nav_popup');
      this.popup.get().children[0].replaceWith(navAuthPopup.get());

      navAuthPopup.get().addEventListener('click', (e) => {
        if (e.target !== this.navUnauthPopup.get()) {
          this.clickHamburger();
        }
      });
    } else {
      this.popup.get().children[0].replaceWith(this.navUnauthPopup.get());
    }
  }
}

const burger = new Burger();
export default burger;
