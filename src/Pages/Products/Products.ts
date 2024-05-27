import './Products.scss';
import catalogState from '../../states/CatalogState';
import Div from '../../ui-components/Div/Div';
import Input from '../../ui-components/Input/Input';
import Select from '../../ui-components/Select/Select';
import Span from '../../ui-components/Span/Span';
import { ProductCard } from './ProductCard';
import Img from '../../ui-components/Img/Img';
import { ProductsForPage } from '../../data/constants';
import Loading from '../../components/Loading/Loading';
import { SortEndpoints, TypeEndpoints } from '../../data/productsEndpoints';
import { catalogTitles } from '../../data/data';

export default class Catalog {
  private breadcrumb: Div;
  private filterSearch: Div;
  private sorting: Select;
  private filter: Select;
  private showAll: Span;
  private search: Input;
  private cardsWrapper: Div;
  private pageNavigation: Div;
  public activePage: number;
  private pagesCount: number;
  public activeType: string;
  activeSorting: string;

  constructor() {
    this.breadcrumb = new Div('catalog__breadcrumb');
    this.filterSearch = new Div('catalog__filter-search');
    this.sorting = new Select('catalog__sorting');
    this.activeSorting = '';
    this.sorting.addListener(async () => {
      await this.sortProducts();
    });
    this.filter = new Select('catalog__filter');
    this.filter.addListener(async () => {
      await this.filterByCategory();
    });
    this.showAll = new Span(catalogTitles.all, 'catalog__show-all');
    this.showAll.get().addEventListener('click', async () => {
      await this.showProducts(TypeEndpoints.pop);
    });
    this.search = new Input('', 'catalog__search');
    this.cardsWrapper = new Div('catalog__cards-wrapper');
    this.pageNavigation = new Div('catalog__page-navigation');
    this.activePage = 1;
    this.pagesCount = 0;
    this.activeType = TypeEndpoints.all;
    this.pageNavigation.get().addEventListener('click', (e) => this.switchPages(e, this.pagesCount));
  }

  render() {
    const container = new Div('catalog__container');
    this.breadcrumb.get().innerText = 'Catalog/Pop!';
    const productsContainer = new Div('catalog__products');
    productsContainer.get().append(this.filterSearch.get(), this.cardsWrapper.get());
    container.get().append(this.breadcrumb.get(), productsContainer.get(), this.pageNavigation.get());
    return container.get();
  }

  async showProducts(typeEndpoint: string) {
    this.activeSorting = '';
    this.activePage = 1;
    this.activeType = typeEndpoint;
    await this.renderFilterSearch();
    await this.renderProducts(this.activePage, this.activeType, this.activeSorting);
  }

  async renderFilterSearch() {
    this.filterSearch.get().innerHTML = '';
    const filterWrapper = new Div('catalog__ffilter-wrapper', this.filterSearch.get());
    filterWrapper.get().append(this.sorting.get());
    this.sorting.get().innerHTML = '';
    this.search.render(this.filterSearch.get());
    this.renderOptions(this.sorting.get(), catalogTitles.sortingOptions);
    if (this.activeType !== TypeEndpoints.accessories) {
      this.filter.get().innerHTML = '';
      this.renderOptions(this.filter.get(), catalogTitles.filterOptions);
      filterWrapper.get().append(this.filter.get(), this.showAll.get());
    }
  }

  renderOptions(parentElement: HTMLElement, options: string[]) {
    options
      .map((option) => {
        const sortOption = document.createElement('option');
        sortOption.innerText = option;
        return sortOption;
      })
      .map((option) => parentElement.append(option));
  }

  async renderProducts(page: number, filter: string, sorting: string) {
    this.cardsWrapper.get().innerHTML = '';
    const products = await catalogState.getSelectedData(page, filter, sorting);
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
        await this.renderProducts(this.activePage, this.activeType, this.activeSorting);
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
      await this.renderProducts(this.activePage, this.activeType, this.activeSorting);
      loading.remove();
    }
    if (
      clickedElement.closest('img') &&
      clickedElement.classList.contains('catalog__pages-next') &&
      this.activePage < pagesCount
    ) {
      this.activePage++;
      const loading = new Loading();
      await this.renderProducts(this.activePage, this.activeType, this.activeSorting);
      loading.remove();
    }
  }

  async filterByCategory() {
    switch (this.filter.get().value) {
      case catalogTitles.filterOptions[0]:
        break;
      case catalogTitles.filterOptions[1]:
        await this.showFilteredProducts(TypeEndpoints.marvel);
        break;
      case catalogTitles.filterOptions[2]:
        await this.showFilteredProducts(TypeEndpoints.starwars);
        break;
      case catalogTitles.filterOptions[3]:
        await this.showFilteredProducts(TypeEndpoints.anime);
        break;
    }
  }

  async showFilteredProducts(filter: string) {
    this.activePage = 1;
    this.activeType = filter;
    await this.renderProducts(this.activePage, this.activeType, this.activeSorting);
  }

  async sortProducts() {
    switch (this.sorting.get().value) {
      case catalogTitles.sortingOptions[0]:
        break;
      case catalogTitles.sortingOptions[1]:
        await this.showSortingProducts(SortEndpoints.nameAZ);
        break;
      case catalogTitles.sortingOptions[2]:
        await this.showSortingProducts(SortEndpoints.nameZA);
        break;
    }
  }

  async showSortingProducts(sortEndpoint: string) {
    this.activePage = 1;
    this.activeSorting = sortEndpoint;
    await this.renderProducts(this.activePage, this.activeType, this.activeSorting);
  }
}

export const catalog = new Catalog();
