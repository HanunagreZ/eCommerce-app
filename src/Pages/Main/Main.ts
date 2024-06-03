import Div from '../../ui-components/Div/Div';
import MainAdBlock from '../../components/MainAdBlock/MainAdBlock';
import { mainAdBlock } from '../../data/data';
import './Main.scss';

export default class MainPage {
  private element: Div;
  private imageContainer: Div;

  constructor() {
    this.element = new Div('main');
    this.imageContainer = new Div('main__imageContainer', this.element.get());
    new MainAdBlock(mainAdBlock.marvel, this.element.get());
    new MainAdBlock(mainAdBlock.starwars, this.element.get());
    new MainAdBlock(mainAdBlock.anime, this.element.get());
  }

  render() {
    return this.element.get();
  }
}
