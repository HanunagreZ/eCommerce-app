// import Button from '../../ui-components/Button/Button';
import Div from '../../ui-components/Div/Div';
import './header.scss';
import A from '../../ui-components/A/A';
import NavUnauth from './NavUnauth';
import Burger from './Burger';

export default class Header {
  private element: HTMLHeadElement;

  constructor(parentElement: HTMLElement) {
    this.element = document.createElement('header');
    this.element.classList.add('header');
    this.render(parentElement);
  }

  render(parentElement: HTMLElement) {
    const logo = new Div('header__logo', this.element);
    const logoLink = new A('#', '', logo.get());
    const imgLogo = document.createElement('img');
    imgLogo.src = 'assets/testLogo.png';
    logoLink.get().append(imgLogo);

    new NavUnauth('header__nav').render(this.element);
    new Burger(this.element);
    parentElement.append(this.element);
  }
}
