import Button from '../../ui-components/Button/Button';
import Span from '../../ui-components/Span/Span';
import Div from '../../ui-components/Div/Div';
import './modal.scss';

export default class ModalSuccess {
  private container: Div;
  private background: Div;

  constructor(className: string, parentElement: HTMLElement) {
    this.container = new Div(className, parentElement);
    this.background = new Div('modal__background', this.container.get());
    this.render(parentElement);
  }

  render(parentElement: HTMLElement) {
    const icon = document.createElement('img');
    icon.classList.add('modal__icon');
    icon.src = 'assets/icons/iconSuccess.svg';
    const title = new Span('Welcome!', 'modal__title', this.container.get());
    const description = new Span('Account successfully created', 'modal__description', this.container.get());
    const btn = new Button('Go to main page', 'modal__btn', this.container.get());

    btn.get().addEventListener('click', () => {
      this.container.get().remove();
      this.background.get().remove();
      location.href = '/';
    });

    this.container.get().append(icon, title.get(), description.get(), btn.get());

    document.body.scrollIntoView();
    parentElement.append(this.background.get(), this.container.get());
  }
}
