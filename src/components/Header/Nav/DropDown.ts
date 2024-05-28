import { catalog } from '../../../Pages/Products/Products';
import { TypeEndpoints } from '../../../data/productsEndpoints';
import Li from '../../../ui-components/Li/Li';
import Link from '../../../ui-components/Link/Link';

export default class DropDown {
  private element: HTMLUListElement;
  private popLi: Li;
  private popLink: Link;
  private accessoriesLink: Link;

  constructor() {
    this.element = document.createElement('ul');
    this.element.classList.add('header__dropdown_hidden');
    this.popLi = new Li(this.element);
    this.popLink = new Link('/catalog', 'Pop!', this.popLi.get());
    this.accessoriesLink = new Link('#', 'Accessories', new Li(this.element).get());
  }

  get() {
    return this.element;
  }

  render(parentElement: HTMLElement) {
    this.popLink.get().addEventListener('click', async () => {
      this.element.classList.toggle('header__dropdown_active');
      parentElement.children[2].classList.remove('.header__dropdown-arrow-down');
      await catalog.showProducts(TypeEndpoints.pop);
    });

    this.accessoriesLink.get().addEventListener('click', async () => {
      this.element.classList.toggle('header__dropdown_active');
      parentElement.children[2].classList.toggle('.header__dropdown-arrow-down');
      await catalog.showProducts(TypeEndpoints.accessories);
    });

    this.element.addEventListener('mouseleave', () => {
      this.element.classList.remove('header__dropdown_active');
      parentElement.children[2].classList.toggle('header__dropdown-arrow-down');
    });

    parentElement.append(this.element);
  }
}
