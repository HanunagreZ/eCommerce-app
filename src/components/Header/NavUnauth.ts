import A from '../../ui-components/A/A';
import Li from '../../ui-components/Li/Li';
import Button from '../../ui-components/Button/Button';

export default class NavUnauth {
  private element: HTMLElement;

  constructor(className: string) {
    this.element = document.createElement('nav');
    this.element.classList.add(className);
  }

  get() {
    return this.element;
  }

  render(parentElement: HTMLElement) {
    const list = document.createElement('ul');
    list.classList.add('header__nav-list');
    this.element.append(list);

    const helpLink = new A('#', 'Help', new Li(list).get());

    helpLink.get().addEventListener('click', () => {
      const burgerPopup = document.querySelector('.burger__popup');
      burgerPopup?.classList.toggle('burger__popup_active');
    });

    const catalogLink = new A('#', 'Catalog', new Li(list).get());

    catalogLink.get().addEventListener('click', () => {
      const burgerPopup = document.querySelector('.burger__popup');
      burgerPopup?.classList.toggle('burger__popup_active');
    });

    const signInLink = new A('#', 'Sign in', new Li(list).get());

    signInLink.get().addEventListener('click', () => {
      const burgerPopup = document.querySelector('.burger__popup');
      burgerPopup?.classList.toggle('burger__popup_active');
    });

    const buttonSignUp = new Button('Sign up', 'header__btn', this.element);

    buttonSignUp.get().addEventListener('click', () => {
      const burgerPopup = document.querySelector('.burger__popup');
      burgerPopup?.classList.toggle('burger__popup_active');
    });

    parentElement.append(this.element);
  }
}
