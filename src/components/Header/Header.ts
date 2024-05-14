import Div from '../../ui-components/Div/Div';
import './header.scss';
import Link from '../../ui-components/Link/Link';
import NavUnauth from './NavUnauth';
import NavAuth from './NavAuth';
import burger from './Burger';
import basket from './Basket';

class Header {
  private element: HTMLElement;
  private logoContainer: Div;
  private logoLink: Link;
  private logoImg: HTMLImageElement;
  private navAuth: NavAuth;
  private navUnauth: NavUnauth;
  private state: number;

  constructor() {
    this.element = document.createElement('header');
    this.element.classList.add('header');
    this.logoContainer = new Div('header__logo', this.element);
    this.logoLink = new Link('/', '', this.logoContainer.get());
    this.logoImg = document.createElement('img');
    this.logoImg.src = 'assets/testLogo.png';
    this.logoLink.get().append(this.logoImg);
    this.navAuth = new NavAuth('header__nav');
    this.navUnauth = new NavUnauth('header__nav');
    this.state = 0;
  }

  render(parentElement: HTMLElement) {
    this.reRenderNav();
    basket.render(this.element);
    burger.render(this.element);
    parentElement.append(this.element);
  }

  reRenderNav() {
    if (this.state === 0) {
      this.navUnauth.render(this.element);
      burger.reRenderPopupNav();
      this.state = 1;
      return;
    }
    if (this.state === 1) {
      this.navUnauth.get().replaceWith(this.navAuth.get());
      burger.reRenderPopupNav();
      this.state = 2;
      return;
    }
    if (this.state === 2) {
      this.navAuth.get().replaceWith(this.navUnauth.get());
      this.state = 1;
      burger.reRenderPopupNav();
      return;
    }
  }
}

const header = new Header();
export default header;
