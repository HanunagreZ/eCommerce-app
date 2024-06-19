import Div from '../../ui-components/Div/Div';
import './Loading.scss';

export default class AsyncLoading {
  private container: Div;
  private background: Div;

  constructor(parentElement = document.body) {
    this.background = new Div('loading__background', parentElement);
    this.container = new Div('loading', this.background.get());
  }

  async remove() {
    this.background.get().remove();
  }
}
