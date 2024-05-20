import Link from '../../../ui-components/Link/Link';
import Li from '../../../ui-components/Li/Li';
import Button from '../../../ui-components/Button/Button';
import header from '../Header';
import userState from '../../../states/UserState';

export default class NavAuth {
  private element: HTMLElement;
  private aboutLink: Link;
  private catalogLink: Link;
  private userLink: Link;
  private logOutBtn: Button;

  constructor(className: string) {
    this.element = document.createElement('nav');
    this.element.classList.add(className);
    const list = document.createElement('ul');
    list.classList.add('header__nav-list');
    this.element.append(list);
    this.aboutLink = new Link('#', 'About us', new Li(list).get());
    this.catalogLink = new Link('#', 'Catalog', new Li(list).get());
    this.userLink = new Link('#', String(userState.getUserName()), new Li(list).get());
    this.logOutBtn = new Button('Log out', 'header__btn', this.element);
    this.logOut();
  }

  get() {
    return this.element;
  }

  logOut() {
    this.logOutBtn.get().addEventListener('click', () => {
      header.renderNav();
      userState.removeState();
      location.href = '/';
    });
  }

  render(parentElement: HTMLElement) {
    parentElement.append(this.element);
  }
}
