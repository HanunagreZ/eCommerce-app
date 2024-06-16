import Button from '../../ui-components/Button/Button';
import './modal.scss';
import { IModalProps } from '../../interfaces/interfaces';
import Span from '../../ui-components/Span/Span';
import Div from '../../ui-components/Div/Div';

export default class EnchansedModal {
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
    this.container.get().append();
    const icon = document.createElement('img');
    icon.classList.add('modal__icon');
    icon.src = this.props.icon;
    const title = new Span(this.props.title, 'modal__title');
    const description = new Span(this.props.description, 'modal__description');
    const btn = new Button(this.props.btn, 'modal__btn');

    btn.get().addEventListener('click', () => {
      this.container.get().remove();
      this.background.get().remove();
      this.props.addEvent();
    });

    const secondBtn = new Button(this.props.secondBtn as string, 'modal__btn');

    secondBtn.get().addEventListener('click', () => {
      if (this.props.addsecondEvent) {
        this.props.addsecondEvent();
        this.container.get().remove();
        this.background.get().remove();
      }
    });

    this.container.get().append(icon, title.get(), description.get(), btn.get(), secondBtn.get());

    document.body.scrollIntoView();
    parentElement.append(this.background.get(), this.container.get());
  }
}
