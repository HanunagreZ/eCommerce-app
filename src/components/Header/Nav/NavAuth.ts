import Link from '../../../ui-components/Link/Link';
import Li from '../../../ui-components/Li/Li';
import Button from '../../../ui-components/Button/Button';
import header from '../Header';
import userState from '../../../states/UserState';
import router from '../../..';
import api from '../../../Api';
import DropDown from './DropDown';
import basket from '../Basket/Basket';

export default class NavAuth {
  private element: HTMLElement;
  private aboutLink: Link;
  private catalogLink: Link;
  private userLink: Link;
  private logOutBtn: Button;
  private dropDown: DropDown;
  private dropDownLi: Li;
  private arrow: HTMLImageElement;

  constructor(className: string) {
    this.element = document.createElement('nav');
    this.element.classList.add(className);
    const list = document.createElement('ul');
    list.classList.add('header__nav-list');
    this.element.append(list);
    this.aboutLink = new Link('/about', 'About us', new Li(list).get());
    this.dropDownLi = new Li(list);
    this.dropDown = new DropDown();
    this.catalogLink = new Link('#', 'Catalog', this.dropDownLi.get());
    this.catalogLink.get().classList.add('catalog__link');
    this.arrow = document.createElement('img');
    this.arrow.src = 'assets/icons/arrow-down.svg';
    this.arrow.classList.add('header__dropdown-arrow-up');
    this.dropDown.render(this.dropDownLi.get());
    this.dropDownLi.get().append(this.arrow);
    this.userLink = new Link('/profile', 'Profile', new Li(list).get());
    this.logOutBtn = new Button('Log out', 'header__btn', this.element);
    this.catalogExpand();
    this.logOut();
  }

  get() {
    return this.element;
  }

  catalogExpand() {
    this.catalogLink.get().addEventListener('click', (e) => {
      e.preventDefault();
      this.dropDown.get().classList.toggle('header__dropdown_active');
      this.arrow.classList.toggle('header__dropdown-arrow-down');
    });
  }

  logOut() {
    this.logOutBtn.get().addEventListener('click', () => {
      userState.removeState();
      header.renderNav();
      api.getAccessToken();
      router.navigateTo('/');
      basket.reRenderCount(0);
    });
  }

  render(parentElement: HTMLElement) {
    parentElement.append(this.element);
  }
}
