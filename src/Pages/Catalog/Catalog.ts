import './Catalog.scss';
import catalogState from '../../states/CatalogState';
import Div from '../../ui-components/Div/Div';
import Input from '../../ui-components/Input/Input';
import Select from '../../ui-components/Select/Select';
import Span from '../../ui-components/Span/Span';
import { ProductCard } from './ProductCard';
import Img from '../../ui-components/Img/Img';
import { ProductsForPage } from '../../data/constants';
import { SortEndpoints, TypeEndpoints } from '../../data/productsEndpoints';
import { catalogTitles } from '../../data/data';
import router from '../..';
import { breadProps } from '../../data/data';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Button from '../../ui-components/Button/Button';

export default class Catalog {
  private breadcrumbs: Div;
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
    this.breadcrumbs = new Div('catalog__breadcrumb');
    this.filterSearch = new Div('catalog__filter-search');
    this.sorting = new Select('catalog__sorting');
    this.activeSorting = '';
    this.sorting.addListener(async () => {
      await this.sortProducts();
    });
    this.filter = new Select('catalog__filter');
    this.filter.addListener(async () => {
      const field = this.filter.get().value.toLowerCase().replace(' ', '-');
      await this.renderProducts(this.activePage, this.activeType, this.activeSorting);
      if (field === 'pop!') {
        router.navigateTo('catalog/pop');
      } else if (field === 'accessories') {
        router.navigateTo('catalog/accessories');
      } else {
        router.navigateTo(`catalog/pop/${field}`);
      }
      await this.renderFilterSearch();
    });
    this.showAll = new Span(catalogTitles.all, 'catalog__show-all');
    this.showAll.get().addEventListener('click', async () => {
      if (this.activeType === TypeEndpoints.all) {
        await router.navigateTo('/catalog');
      } else {
        await router.navigateTo('/catalog/pop');
      }
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
    const productsContainer = new Div('catalog__products');
    productsContainer.get().append(this.filterSearch.get(), this.cardsWrapper.get());
    container.get().append(this.breadcrumbs.get(), productsContainer.get(), this.pageNavigation.get());
    return container.get();
  }

  async showProducts(typeEndpoint: string) {
    this.activeSorting = '';
    this.activePage = 1;
    this.activeType = typeEndpoint;
    this.setBreadCrumbs(typeEndpoint);
    await this.renderFilterSearch();
    await this.renderProducts(this.activePage, this.activeType, this.activeSorting);
  }

  async renderFilterSearch() {
    this.filterSearch.get().innerHTML = '';
    const filterWrapper = new Div('catalog__ffilter-wrapper', this.filterSearch.get());
    filterWrapper.get().append(this.sorting.get());
    this.sorting.get().innerHTML = '';
    this.renderOptions(this.sorting.get(), catalogTitles.sortingOptions);
    if (this.activeType !== TypeEndpoints.accessories) {
      this.filter.get().innerHTML = '';
      if (this.activeType === TypeEndpoints.all) {
        this.renderOptions(this.filter.get(), catalogTitles.catalogOptions);
      } else {
        this.renderOptions(this.filter.get(), catalogTitles.filterOptions);
      }
      filterWrapper.get().append(this.filter.get(), this.showAll.get());
    }
    this.renderSearchForm(this.filterSearch.get());
  }

  renderOptions(parentElement: HTMLElement, options: string[]) {
    const selectedCategory = Object.entries(TypeEndpoints).find((el) => el[1] === this.activeType);
    const categoryKey = selectedCategory ? selectedCategory[0] : '';
    options
      .map((option, i) => {
        const sortOption = document.createElement('option');
        sortOption.innerText = option;
        if (i === 0) {
          sortOption.selected = true;
          sortOption.hidden = true;
        }
        if (option.toLowerCase().replaceAll(/\s+/g, '') === categoryKey) {
          sortOption.selected = true;
        }
        return sortOption;
      })
      .map((option) => parentElement.append(option));
  }

  renderSearchForm(parentElement: HTMLElement) {
    const form = document.createElement('form');
    form.classList.add('catalog__search-form');
    this.search.get().placeholder = catalogTitles.searchPlaceholder;
    const searchBtn = new Button('', 'catalog__search-btn');
    searchBtn.addListener(async (e) => {
      await this.searchProduct(e);
    });
    form.append(this.search.get(), searchBtn.get());
    parentElement.append(form);
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
        await this.renderProducts(this.activePage, this.activeType, this.activeSorting);
      }
    }
    if (
      clickedElement.closest('img') &&
      clickedElement.classList.contains('catalog__pages-prev') &&
      this.activePage > 1
    ) {
      this.activePage--;
      await this.renderProducts(this.activePage, this.activeType, this.activeSorting);
    }
    if (
      clickedElement.closest('img') &&
      clickedElement.classList.contains('catalog__pages-next') &&
      this.activePage < pagesCount
    ) {
      this.activePage++;
      await this.renderProducts(this.activePage, this.activeType, this.activeSorting);
    }
    /* 😎 костыль 🤙 */
    window.scrollTo(0, 0);
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
      case catalogTitles.sortingOptions[3]:
        await this.showSortingProducts(SortEndpoints.PriceLowToHigh);
        break;
      case catalogTitles.sortingOptions[4]:
        await this.showSortingProducts(SortEndpoints.PriceHightoLow);
        break;
    }
  }

  async showSortingProducts(sortEndpoint: string) {
    this.activePage = 1;
    this.activeSorting = sortEndpoint;
    await this.renderProducts(this.activePage, this.activeType, this.activeSorting);
  }

  setBreadCrumbs(TypeEndpoint: string) {
    switch (TypeEndpoint) {
      case TypeEndpoints.all:
        this.breadcrumbs = new Breadcrumbs().render(breadProps.category, this.breadcrumbs.get());
        break;
      case TypeEndpoints.pop:
        this.breadcrumbs = new Breadcrumbs().render(breadProps.pop, this.breadcrumbs.get());
        break;
      case TypeEndpoints.accessories:
        this.breadcrumbs = new Breadcrumbs().render(breadProps.accessories, this.breadcrumbs.get());
        break;
      case TypeEndpoints.anime:
        this.breadcrumbs = new Breadcrumbs().render(breadProps.anime, this.breadcrumbs.get());
        break;
      case TypeEndpoints.marvel:
        this.breadcrumbs = new Breadcrumbs().render(breadProps.marvel, this.breadcrumbs.get());
        break;
      case TypeEndpoints.starwars:
        this.breadcrumbs = new Breadcrumbs().render(breadProps.starwars, this.breadcrumbs.get());
        break;
    }
  }

  async searchProduct(e: Event | undefined) {
    e?.preventDefault();
    this.activePage = 1;
    const searchText = this.search.get().value.replace(/ +/g, ' ').trim();
    this.search.get().value = '';
    if (searchText.trim() !== '') {
      await this.renderProducts(this.activePage, `${this.activeType}&text.en-US="${searchText}"`, this.activeSorting);
    }
    if (catalogState.productsCount === 0) {
      new Div('catalog__search-request-msg', this.cardsWrapper.get()).get().innerText = catalogTitles.searchRequest;
      new Div('catalog__search-request', this.cardsWrapper.get()).get().innerText = searchText;
      new Div('catalog__no-search-results', this.cardsWrapper.get()).get().innerHTML = catalogTitles.noSearchresults;
    }
  }
}

export const catalog = new Catalog();
