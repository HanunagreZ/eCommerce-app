import Button from '../../ui-components/Button/Button';
import Span from '../../ui-components/Span/Span';
import Div from '../../ui-components/Div/Div';
import './modal.scss';
import { IModalProps } from '../../interfaces/interfaces';

export default class Modal {
  private container: Div;
  private background: Div;
  private props: IModalProps;
  private parentElement: HTMLElement;

  constructor(props: IModalProps) {
    this.parentElement = document.body;
    this.container = new Div('modal', this.parentElement);
    this.background = new Div('modal__background', this.container.get());
    this.props = props;
    this.render(this.parentElement);
  }

  render(parentElement: HTMLElement) {
    const icon = document.createElement('img');
    icon.classList.add('modal__icon');
    icon.src = this.props.icon;
    const title = new Span(this.props.title, 'modal__title', this.container.get());
    const description = new Span(this.props.description, 'modal__description', this.container.get());
    const btn = new Button(this.props.btn, 'modal__btn', this.container.get());

    btn.get().addEventListener('click', () => {
      this.container.get().remove();
      this.background.get().remove();
      this.props.addEvent();
    });

    this.container.get().append(icon, title.get(), description.get(), btn.get());
    parentElement.append(this.background.get(), this.container.get());
  }
}
