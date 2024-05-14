import Button from '../../ui-components/Button/Button';
import Span from '../../ui-components/Span/Span';
import Div from '../../ui-components/Div/Div';
import './modal.scss';

export default class ModalEmail {
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
    icon.src = 'assets/icons/iconError.svg';
    const title = new Span('This email is already in use', 'modal__title', this.container.get());
    const description = new Span('Please log in or use another email', 'modal__description', this.container.get());
    const btn = new Button('Back', 'modal__btn', this.container.get());

    btn.get().addEventListener('click', () => {
      this.container.get().remove();
      this.background.get().remove();
    });

    this.container.get().append(icon, title.get(), description.get(), btn.get());
    parentElement.append(this.background.get(), this.container.get());
  }
}
