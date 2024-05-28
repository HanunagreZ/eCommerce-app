import api from '../Api';
import { IFilteredProductResponseData, IProductCard } from '../interfaces/interfaces';
// import { sortProductsById } from '../utils/filter';
// import { sortProductsById } from '../utils/filter';

export class CatalogState {
  public productsCount = 0;
  private categories = [];

  async getCategories() {
    this.categories = await api.getAllCategories();
  }

  getProductsCount() {
    return this.productsCount;
  }

  async getSelectedData(page: number, filter: string, sorting: string) {
    const data = await api.getSelectedProducts(page, filter, sorting);

    const products = data.results;

    // const date2 = sortProductsById(products, 'cb0f9315-4738-41de-bdd5-92be6ca24d99');
    // console.log(date2);

    this.productsCount = data.total;
    console.log(products);
    const productsData: IProductCard[] = products.map((el: IFilteredProductResponseData) => {
      return {
        imgSrc: el.masterVariant.images[0].url,
        category: this.setFilteredCategoryName(el),
        name: el.name['en-US' as keyof typeof el.name],
        price: el.masterVariant.prices[0].value.centAmount,
        discountedPrice: this.setFilteredDiscountedPrice(el),
      };
    });
    return productsData;
  }

  setFilteredCategoryName(product: IFilteredProductResponseData): string {
    let categoryName = '';
    this.categories.forEach((categoryItem: { id: string; name: { [x: string]: string } }) => {
      if (categoryItem.id === product.categories[0].id) {
        categoryName = categoryItem.name['en-US' as keyof typeof categoryItem.name];
      }
    });
    return categoryName;
  }

  setFilteredDiscountedPrice(product: IFilteredProductResponseData) {
    return product.masterVariant.prices[0].discounted !== undefined
      ? product.masterVariant.prices[0].discounted.value.centAmount
      : 0;
  }
}

const catalogState = new CatalogState();
catalogState.getCategories();
export default catalogState;
