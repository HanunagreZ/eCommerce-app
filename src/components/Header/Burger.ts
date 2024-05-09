//import Div from '../../ui-components/Div/Div';
import Div from '../../ui-components/Div/Div';
import NavUnauth from './NavUnauth';

export default class Burger {
  private element: HTMLDivElement;
  private burgerLine1: HTMLImageElement;
  private burgerLine2: HTMLImageElement;
  private burgerLine3: HTMLImageElement;
  private popup: Div;

  constructor(parentElement: HTMLElement) {
    this.element = document.createElement('div');
    this.element.classList.add('header__burger');
    this.burgerLine1 = document.createElement('img');
    this.burgerLine2 = document.createElement('img');
    this.burgerLine3 = document.createElement('img');
    this.popup = new Div('burger__popup', parentElement);
    new NavUnauth('burger__popup_nav').render(this.popup.get());
    this.render(parentElement);
  }

  get() {
    return this.element;
  }

  hambOpen() {
    this.burgerLine1.classList.toggle('header__burger-line1_active');
    this.burgerLine2.classList.toggle('header__burger-line2_active');
    this.burgerLine3.classList.toggle('header__burger-line3_active');
    this.popup.get().classList.toggle('burger__popup_active');

    /*navUnauth.get().classList.toggle('header__nav_burger');
    const navList = document.querySelector('.header__nav-list');
    navList?.classList.toggle('header__nav-list_burger');
    this.popup.get().append(navUnauth.get());*/

    //body.classList.toggle('noscroll');
  }

  render(parentElement: HTMLElement) {
    this.element.addEventListener('click', () => {
      this.hambOpen();
    });

    this.burgerLine1.src = 'assets/burgerLine.svg';
    this.burgerLine1.classList.add('header__burger-line1');

    this.burgerLine2.src = 'assets/burgerLine.svg';
    this.burgerLine2.classList.add('header__burger-line2');

    this.burgerLine3.src = 'assets/burgerLine.svg';
    this.burgerLine3.classList.add('header__burger-line3');
    this.element.append(this.burgerLine1, this.burgerLine2, this.burgerLine3);
    parentElement.append(this.element);
  }
}
