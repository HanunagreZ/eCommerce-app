import api from '../Api';
import { productTypeID } from '../data/productsEndpoints';
import { IProductCard, IProductResponseData } from '../interfaces/interfaces';

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
    this.productsCount = data.total;
    const productsData: IProductCard[] = products.map((el: IProductResponseData) => {
      return {
        productType: this.setProductType(el),
        key: el.key,
        imgSrc: el.masterVariant.images[0].url,
        category: this.setCategoryName(el),
        name: el.name['en-US' as keyof typeof el.name],
        price: el.masterVariant.prices[0].value.centAmount,
        discountedPrice: el.masterVariant.prices[1] !== undefined ? el.masterVariant.prices[1].value.centAmount : 0,
      };
    });
    return productsData;
  }

  
  setProductType(product: IProductResponseData) {
    const result = Object.entries(productTypeID).find((type) => type[1] === product.productType.id);
    return result ? result[0] : '';
  }

  setCategoryName(product: IProductResponseData): string {
    let categoryName = '';
    this.categories.forEach((categoryItem: { id: string; name: { [x: string]: string } }) => {
      if (categoryItem.id === product.categories[0].id) {
        categoryName = categoryItem.name['en-US' as keyof typeof categoryItem.name];
      }
    });
    return categoryName;
  }

}

const catalogState = new CatalogState();
catalogState.getCategories();
export default catalogState;
