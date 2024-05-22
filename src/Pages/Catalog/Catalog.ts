import Div from '../../ui-components/Div/Div';
import Input from '../../ui-components/Input/Input';
import Select from '../../ui-components/Select/Select';
import Span from '../../ui-components/Span/Span';

export default class Catalog {
  private breadcrumb: Div;
  private sorting: Select;
  private filter: Select;
  private showAll: Span;
  private search: Input;

  constructor() {
    this.breadcrumb = new Div('catalog__breadcrumb');
    this.sorting = new Select('catalog__sorting');
    this.filter = new Select('catalog__filter');
    this.showAll = new Span('Show All', 'catalog__show-all');
    this.search = new Input('', 'catalog__search');
  }
  render() {
    const container = new Div('catalog__container');

    const productsContainer = new Div('catalog__products');
    const filterSearch = new Div('catalog__filter-search');
    filterSearch.get().append(this.sorting.get(), this.filter.get(), this.showAll.get(), this.search.get());

    productsContainer.get().append(filterSearch.get());

    container.get().append(this.breadcrumb.get(), productsContainer.get());
    return container.get();
  }
  // render() {
  //   const elem = document.createElement('div');
  //   const header = document.createElement('h2');
  //   header.textContent = 'Products Page';
  //   const link = document.createElement('a');
  //   link.textContent = 'TO Main ';
  //   link.href = '/';
  //   elem.append(header, link);
  //   return elem;
  // }
}
