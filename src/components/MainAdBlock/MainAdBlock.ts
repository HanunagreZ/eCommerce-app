import Button from '../../ui-components/Button/Button';
import Span from '../../ui-components/Span/Span';
import Div from '../../ui-components/Div/Div';
import './mainAdBlock.scss';
import { IMainAdBlockProps } from '../../interfaces/interfaces';

export default class MainAdBlock {
  private container: Div;
  private block: Div;
  private image: HTMLImageElement;
  private props: IMainAdBlockProps;
  private parentElement: HTMLElement;

  constructor(props: IMainAdBlockProps, parentElement: HTMLElement) {
    this.parentElement = parentElement;
    this.props = props;
    this.container = new Div(this.props.containerClass, this.parentElement);
    this.block = new Div(this.props.blockClass, this.parentElement);
    this.image = new Image();
    this.image.src = this.props.image;
    this.image.classList.add(this.props.imageClass);
    this.render(this.parentElement);
  }

  render(parentElement: HTMLElement) {
    const title = new Span(this.props.title, 'adBlock__title');
    const description = new Span(this.props.description, 'adBlock__description');
    const btn = new Button(this.props.btn, 'adBlock__btn');

    btn.get().addEventListener('click', () => {
      this.props.addEvent();
    });

    this.block.get().append(title.get(), description.get(), btn.get());
    this.container.get().append(this.block.get(), this.image);
    parentElement.append(this.container.get());
  }
}
