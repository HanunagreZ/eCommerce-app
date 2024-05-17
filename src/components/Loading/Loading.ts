import Div from '../../ui-components/Div/Div';
import './Loading.scss';

export default class Loading {
  private container: Div;
  private background: Div;

  constructor(parentElement = document.body) {
    this.background = new Div('loading__background', parentElement);
    this.container = new Div('loading', this.background.get());
  }

  remove() {
    this.background.get().remove();
  }
}
