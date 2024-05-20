import './404.scss';
import Div from '../../ui-components/Div/Div';
import Button from '../../ui-components/Button/Button';
import router from '../..';
import { constants } from '../../data/data';

export default class Page404 {
  private container: Div;
  private pageHeader: HTMLHeadingElement;
  private pageSubHeader: HTMLHeadingElement;
  private pageInfo: HTMLParagraphElement;
  private button: Button;

  constructor() {
    this.container = new Div('wrapper__404');
    this.pageHeader = document.createElement('h2');
    this.pageHeader.classList.add('title__404');
    this.pageHeader.textContent = '404';
    this.pageSubHeader = document.createElement('h3');
    this.pageSubHeader.classList.add('description__404');
    this.pageSubHeader.textContent = constants[404].pageTitle;
    this.pageInfo = document.createElement('p');
    this.pageInfo.classList.add('info__404');
    this.pageInfo.textContent = constants[404].pageText;
    this.button = new Button(constants[404].buttonTitle, 'button__404');
    this.button.get().onclick = () => router.navigateTo('/');
  }

  render() {
    this.container.get().append(this.pageHeader, this.pageSubHeader, this.pageInfo, this.button.get());
    return this.container.get();
  }
}
