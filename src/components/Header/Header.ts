import Div from '../../ui-components/Div/Div';
import './header.scss';
import Link from '../../ui-components/Link/Link';
import NavUnauth from './Nav/NavUnauth';
import NavAuth from './Nav/NavAuth';
import burger from './Burger/Burger';
import basket from './Basket/Basket';
import userState from '../../states/UserState';

class Header {
  private element: HTMLElement;
  private logoContainer: Div;
  private logoLink: Link;
  private logoImg: HTMLImageElement;
  private navAuth: NavAuth;
  private navUnauth: NavUnauth;

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
  }

  render(parentElement: HTMLElement) {
    this.renderNav();
    basket.render(this.element);
    burger.render(this.element);
    parentElement.append(this.element);
  }

  renderNav() {
    if (userState.getUserName()) {
      this.navUnauth?.get().remove();
      this.navAuth.render(this.element);
    } else {
      this.navAuth?.get().remove();
      this.navUnauth.render(this.element);
    }
    burger.renderPopupNav();
  }
}

const header = new Header();
export default header;
