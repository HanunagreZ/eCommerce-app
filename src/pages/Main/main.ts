import Div from '../../ui-components/Div/Div';
import './Main.scss';

export default class MainPage {
  private element: Div;

  constructor() {
    this.element = new Div('main');
  }

  render() {
    this.element.get().innerText = 'Main Page';
    return this.element.get();
  }
}
