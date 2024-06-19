import './Header.scss';
import Div from '../../ui-components/Div/Div';
import Link from '../../ui-components/Link/Link';
import NavUnauth from './Nav/NavUnauth';
import NavAuth from './Nav/NavAuth';
import burger from './Burger/Burger';
import basket from './Basket/Basket';
import userState from '../../states/UserState';
import router from '../..';

class Header {
  private element: HTMLElement;
  private logoContainer: Div;
  private logoLink: Link;
  private logoImg: HTMLImageElement;
  private navDiv: Div;
  private navUnAuth: NavUnauth;

  constructor() {
    this.element = document.createElement('header');
    this.element.classList.add('header');
    this.logoContainer = new Div('header__logo', this.element);
    this.logoLink = new Link('/', '', this.logoContainer.get());
    this.logoImg = document.createElement('img');
    this.logoImg.src = 'assets/siteLogo.svg';
    this.logoLink.get().append(this.logoImg);
    this.navDiv = new Div('header__navDiv');
    this.navUnAuth = new NavUnauth('header__nav');
  }

  async render(parentElement: HTMLElement) {
    await this.logoImg.addEventListener('click', (e) => {
      e.preventDefault();
      router.navigateTo('/');
    });

    await this.navDiv.render(this.element);
    await this.renderNav();
    await basket.render(this.element);
    await burger.render(this.element);
    await parentElement.append(this.element);
  }

  renderNav() {
    if (userState.getUserName()) {
      const navAuth = new NavAuth('header__nav');
      this.element.children[1].replaceWith(navAuth.get());
    } else {
      this.element.children[1].replaceWith(this.navUnAuth.get());
    }
    burger.renderPopupNav();
  }
}

const header = new Header();
export default header;
