import { IBreadcrumbsProps } from '../../interfaces/interfaces';
import Div from '../../ui-components/Div/Div';
import Li from '../../ui-components/Li/Li';
import Link from '../../ui-components/Link/Link';
import './Breadcrumbs.scss';

export default class Breadcrumbs {
  private element: Div;
  private breadNav: HTMLElement;
  private breadList: HTMLUListElement;

  constructor() {
    this.element = new Div('breadcrumbs');
    this.breadNav = document.createElement('nav');
    this.breadNav.classList.add('breadcrumbs__nav');
    this.breadList = document.createElement('ul');
    this.breadList.classList.add('breadcrumbs__list');
    this.breadNav.append(this.breadList);
    this.element.get().append(this.breadNav);
  }

  render(props: IBreadcrumbsProps, parentElement: HTMLElement) {
    for (let i = 0; i < props.href.length; i++) {
      const li = new Li(this.breadList);
      new Link(props.href[i], props.text[i], li.get());
    }

    parentElement.append(this.element.get());
    return this.element;
  }
}
