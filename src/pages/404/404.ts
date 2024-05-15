import './404.scss';
import Div from '../../ui-components/Div/Div';
import Button from '../../ui-components/Button/Button';

export default class Page404 {
  private container: Div;
  private pageHeader: HTMLHeadingElement;
  private pageSubHeader: HTMLHeadingElement;
  private pageInfo: HTMLParagraphElement;
  private button: Button;

  constructor() {
    this.container = new Div('wrapper__404');
    this.pageHeader = document.createElement('h2');
    this.pageHeader.classList.add('header__404');
    this.pageHeader.textContent = '404';
    this.pageSubHeader = document.createElement('h3');
    this.pageSubHeader.classList.add('subheader__404');
    this.pageSubHeader.textContent = 'Page not found';
    this.pageInfo = document.createElement('p');
    this.pageInfo.classList.add('info__404');
    this.pageInfo.textContent = 'Oops!, the page you looking for does not exist';
    this.button = new Button('Return to main', 'button__404');
    this.button.get().onclick = () => (window.location.href = '/');
  }

  render() {
    this.container.get().append(this.pageHeader, this.pageSubHeader, this.pageInfo, this.button.get());
    return this.container.get();
  }
}
