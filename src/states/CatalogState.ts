import api from '../Api';
import { productTypeID } from '../data/productsEndpoints';
import { IProductCard, IProductResponseData } from '../interfaces/interfaces';

export class CatalogState {
  public productsCount = 0;

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
        category: el.categories[0].obj.name['en-US'],
        name: el.name['en-US' as keyof typeof el.name],
        price: el.masterVariant.prices[0].value.centAmount,

        discountedPrice:
          el.masterVariant.prices[0].discounted !== undefined
            ? el.masterVariant.prices[0].discounted.value.centAmount
            : 0,
      };
    });
    return productsData;
  }

  setProductType(product: IProductResponseData) {
    const result = Object.entries(productTypeID).find((type) => type[1] === product.productType.id);
    return result ? result[0] : '';
  }
}

const catalogState = new CatalogState();
export default catalogState;
