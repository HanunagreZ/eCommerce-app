import './Catalog.scss';
import catalogState from '../../states/CatalogState';
import Div from '../../ui-components/Div/Div';
import Input from '../../ui-components/Input/Input';
import Select from '../../ui-components/Select/Select';
import Span from '../../ui-components/Span/Span';
import { Product } from './Product';

export default class Catalog {
  private breadcrumb: Div;
  private sorting: Select;
  private filter: Select;
  private showAll: Span;
  private search: Input;
  private cardsWrapper: Div;

  constructor() {
    this.breadcrumb = new Div('catalog__breadcrumb');
    this.sorting = new Select('catalog__sorting');
    this.filter = new Select('catalog__filter');
    this.showAll = new Span('Show All', 'catalog__show-all');
    this.search = new Input('', 'catalog__search');
    this.cardsWrapper = new Div('catalog__cards-wrapper');
  }
  render() {
    const container = new Div('catalog__container');
    this.breadcrumb.get().innerText = 'Catalog/Pop!';
    const productsContainer = new Div('catalog__products');
    const filterSearch = new Div('catalog__filter-search');
    filterSearch.get().append(this.sorting.get(), this.filter.get(), this.showAll.get(), this.search.get());
    productsContainer.get().append(filterSearch.get(), this.cardsWrapper.get());
    container.get().append(this.breadcrumb.get(), productsContainer.get());
    return container.get();
  }
  async renderProducts() {
    this.cardsWrapper.get().innerHTML = '';
    const products = await catalogState.getProductsData();
    products.map((data) => {
      new Product(data, this.cardsWrapper.get());
    });
  }
}

export const catalog = new Catalog();
