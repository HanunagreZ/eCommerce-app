import './Catalog.scss';
import catalogState from '../../states/CatalogState';
import Div from '../../ui-components/Div/Div';
import Input from '../../ui-components/Input/Input';
import Select from '../../ui-components/Select/Select';
import Span from '../../ui-components/Span/Span';
import { Product } from './Product';
import Img from '../../ui-components/Img/Img';
import { ProductsForPage } from '../../data/constants';
import Loading from '../../components/Loading/Loading';

export default class Catalog {
  private breadcrumb: Div;
  private sorting: Select;
  private filter: Select;
  private showAll: Span;
  private search: Input;
  private cardsWrapper: Div;
  private pageNavigation: Div;
  activePage: number;
  pagesCount: number;

  constructor() {
    this.breadcrumb = new Div('catalog__breadcrumb');
    this.sorting = new Select('catalog__sorting');
    this.filter = new Select('catalog__filter');
    this.showAll = new Span('Show All', 'catalog__show-all');
    this.search = new Input('', 'catalog__search');
    this.cardsWrapper = new Div('catalog__cards-wrapper');
    this.pageNavigation = new Div('catalog__page-navigation');
    this.activePage = 1;
    this.pagesCount = 0;
    this.pageNavigation.get().addEventListener('click', (e) => this.switchPages(e, this.pagesCount));
  }

  render() {
    const container = new Div('catalog__container');
    this.breadcrumb.get().innerText = 'Catalog/Pop!';
    const productsContainer = new Div('catalog__products');
    const filterSearch = new Div('catalog__filter-search');
    this.showAll.get().addEventListener('click', async () => {
      const loading = new Loading();
      await this.renderProducts(this.activePage);
      loading.remove();
    });
    filterSearch.get().append(this.sorting.get(), this.filter.get(), this.showAll.get(), this.search.get());
    productsContainer.get().append(filterSearch.get(), this.cardsWrapper.get());
    container.get().append(this.breadcrumb.get(), productsContainer.get(), this.pageNavigation.get());
    return container.get();
  }

  async renderProducts(page = 1) {
    this.cardsWrapper.get().innerHTML = '';
    const products = await catalogState.getProductsData(page);
    products.map((data) => {
      new Product(data, this.cardsWrapper.get());
    });
    await this.renderPageNavigation(page);
  }

  async renderPageNavigation(activePage = 1) {
    this.pageNavigation.get().innerHTML = '';
    const productsCount = await catalogState.getProductsCount();
    this.pagesCount = Math.floor(productsCount / ProductsForPage);
    new Img('catalog__pages-prev', './../../assets/icons/iconPrev.svg', 'Back', this.pageNavigation.get());

    for (let i = 1; i <= this.pagesCount; i++) {
      const page = new Span(String(i), 'catalog__page-number', this.pageNavigation.get());
      if (i === activePage) {
        page.get().classList.add('active');
      }
    }
    new Img('catalog__pages-next', './../../assets/icons/iconNext.svg', 'Back', this.pageNavigation.get());
  }

  async switchPages(e: Event, pagesCount: number) {
    const clickedElement = e.target as HTMLElement;
    if (clickedElement.classList.contains('active')) {
      e.preventDefault();
    } else {
      if (clickedElement.closest('span')) {
        this.activePage = Number(clickedElement.innerText);
        const loading = new Loading();
        await this.renderProducts(this.activePage);
        loading.remove();
      }
    }
    if (
      clickedElement.closest('img') &&
      clickedElement.classList.contains('catalog__pages-prev') &&
      this.activePage > 1
    ) {
      this.activePage--;
      const loading = new Loading();
      await this.renderProducts(this.activePage);
      loading.remove();
    }
    if (
      clickedElement.closest('img') &&
      clickedElement.classList.contains('catalog__pages-next') &&
      this.activePage < pagesCount
    ) {
      this.activePage++;
      const loading = new Loading();
      await this.renderProducts(this.activePage);
      loading.remove();
    }
  }
}

export const catalog = new Catalog();
