import './Catalog.scss';
import catalogState from '../../states/CatalogState';
import Div from '../../ui-components/Div/Div';
import Input from '../../ui-components/Input/Input';
import Select from '../../ui-components/Select/Select';
import Span from '../../ui-components/Span/Span';
import { ProductCard } from './ProductCard';
import Img from '../../ui-components/Img/Img';
import { ProductsForPage } from '../../data/constants';
import Loading from '../../components/Loading/Loading';
import catalogProxy from './CatalogProxi';
import { FilterEndpoints } from '../../data/productsEndpoints';
import { catalogTitles } from '../../data/data';

export default class Catalog {
  private breadcrumb: Div;
  private sorting: Select;
  private filter: Select;
  private showAll: Span;
  private search: Input;
  private cardsWrapper: Div;
  private pageNavigation: Div;
  private activePage: number;
  private pagesCount: number;
  private activeFilter: FilterEndpoints | undefined;

  constructor() {
    this.breadcrumb = new Div('catalog__breadcrumb');
    this.sorting = new Select('catalog__sorting');
    this.filter = new Select('catalog__filter');
    this.showAll = new Span(catalogTitles.all, 'catalog__show-all');
    this.search = new Input('', 'catalog__search');
    this.cardsWrapper = new Div('catalog__cards-wrapper');
    this.pageNavigation = new Div('catalog__page-navigation');
    this.activePage = 1;
    this.pagesCount = 0;
    this.activeFilter = undefined;

    this.pageNavigation.get().addEventListener('click', (e) => this.switchPages(e, this.pagesCount));
  }

  render() {
    const container = new Div('catalog__container');
    this.breadcrumb.get().innerText = 'Catalog/Pop!';
    const productsContainer = new Div('catalog__products');
    const filterSearch = new Div('catalog__filter-search');

    this.showAll.get().addEventListener('click', async () => {
      this.activeFilter = FilterEndpoints.pop;
      const loading = new Loading();
      await this.renderProducts(this.activePage, this.activeFilter);

      loading.remove();
    });
    filterSearch.get().append(this.sorting.get(), this.filter.get(), this.showAll.get(), this.search.get());
    productsContainer.get().append(filterSearch.get(), this.cardsWrapper.get());
    container.get().append(this.breadcrumb.get(), productsContainer.get(), this.pageNavigation.get());
    return container.get();
  }

  async renderProducts(page = 1, filter?: FilterEndpoints) {
    this.cardsWrapper.get().innerHTML = '';
    const products = await catalogProxy.renderCatalog(page, filter);
    products.map((data) => {
      new ProductCard(data, this.cardsWrapper.get());
    });
    await this.renderPageNavigation(page);
  }

  async renderPageNavigation(activePage = 1) {
    this.pageNavigation.get().innerHTML = '';
    const productsCount = catalogState.getProductsCount();
    console.log(productsCount);
    this.pagesCount = Math.ceil(productsCount / ProductsForPage);
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
        await this.renderProducts(this.activePage, this.activeFilter);
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
      await this.renderProducts(this.activePage, this.activeFilter);
      loading.remove();
    }
    if (
      clickedElement.closest('img') &&
      clickedElement.classList.contains('catalog__pages-next') &&
      this.activePage < pagesCount
    ) {
      this.activePage++;
      const loading = new Loading();
      await this.renderProducts(this.activePage, this.activeFilter);
      loading.remove();
    }
  }
}

export const catalog = new Catalog();
