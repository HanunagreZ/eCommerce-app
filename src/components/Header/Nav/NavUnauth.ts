import Link from '../../../ui-components/Link/Link';
import Li from '../../../ui-components/Li/Li';
import Button from '../../../ui-components/Button/Button';
import router from '../../..';
import DropDown from './DropDown';

export default class NavUnauth {
  private element: HTMLElement;
  private aboutLink: Link;
  private catalogLink: Link;
  private signInLink: Link;
  private signUpBtn: Button;
  private dropDown: DropDown;
  private dropDownLi: Li;
  private arrow: HTMLImageElement;

  constructor(className: string) {
    this.element = document.createElement('nav');
    this.element.classList.add(className);
    const list = document.createElement('ul');
    list.classList.add('header__nav-list');
    this.element.append(list);
    this.aboutLink = new Link('#', 'About us', new Li(list).get());
    this.dropDownLi = new Li(list);
    this.dropDown = new DropDown();
    this.catalogLink = new Link('#', 'Catalog', this.dropDownLi.get());
    this.catalogLink.get().classList.add('catalog__link');
    this.arrow = document.createElement('img');
    this.arrow.src = 'assets/icons/arrow-down.svg';
    this.arrow.classList.add('header__dropdown-arrow-up');
    this.dropDown.render(this.dropDownLi.get());
    this.dropDownLi.get().append(this.arrow);
    this.signInLink = new Link('/login', 'Sign in', new Li(list).get());
    this.signUpBtn = new Button('Sign up', 'header__btn', this.element);
    this.catalogExpand();
    this.signUp();
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

  signUp() {
    this.signUpBtn.get().addEventListener('click', () => {
      router.navigateTo('/registration');
    });
  }

  render(parentElement: HTMLElement) {
    parentElement.append(this.element);
  }
}
