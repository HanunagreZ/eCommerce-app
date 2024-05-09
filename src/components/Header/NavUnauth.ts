import A from '../../ui-components/A/A';
import Li from '../../ui-components/Li/Li';
import Button from '../../ui-components/Button/Button';

export default class NavUnauth {
  private element: HTMLElement;
  constructor(parentElement: HTMLElement) {
    this.element = document.createElement('nav');
    this.element.classList.add('header__nav');
    this.render(parentElement);
  }

  render(parentElement: HTMLElement) {
    const list = document.createElement('ul');
    list.classList.add('header__nav-list');
    this.element.append(list);

    new A('#', 'Help', new Li(list).get());
    new A('#', 'Catalog', new Li(list).get());
    new A('#', 'Sign in', new Li(list).get());

    new Button('Sign up', 'header__btn', this.element);

    parentElement.append(this.element);
  }
}
