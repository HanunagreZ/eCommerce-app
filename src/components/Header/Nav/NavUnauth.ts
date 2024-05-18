import Link from '../../../ui-components/Link/Link';
import Li from '../../../ui-components/Li/Li';
import Button from '../../../ui-components/Button/Button';
//import header from './Header';

export default class NavUnauth {
  private element: HTMLElement;
  private aboutLink: Link;
  private catalogLink: Link;
  private signInLink: Link;
  private signUpBtn: Button;

  constructor(className: string) {
    this.element = document.createElement('nav');
    this.element.classList.add(className);
    const list = document.createElement('ul');
    list.classList.add('header__nav-list');
    this.element.append(list);
    this.aboutLink = new Link('#', 'About us', new Li(list).get());

    this.aboutLink.get().addEventListener('click', () => {
      // api.getAccessToken();
    });

    this.catalogLink = new Link('#', 'Catalog', new Li(list).get());
    this.signInLink = new Link('/login', 'Sign in', new Li(list).get());
    this.signUpBtn = new Button('Sign up', 'header__btn', this.element);
    this.signUp();
  }

  get() {
    return this.element;
  }

  signUp() {
    this.signUpBtn.get().addEventListener('click', () => {
      // header.reRenderNav();
      location.href = '/registration';
    });
  }

  render(parentElement: HTMLElement) {
    parentElement.append(this.element);
  }
}
