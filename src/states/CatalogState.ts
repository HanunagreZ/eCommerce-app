import api from '../Api';
import { TypeEndpoints } from '../data/productsEndpoints';
import { IFilteredProductResponseData, IProductCard } from '../interfaces/interfaces';
// import { sortProductsById } from '../utils/filter';
// import { sortProductsById } from '../utils/filter';

export class CatalogState {
  public productsCount = 0;
  private categories = [];

  async getCategories() {
    this.categories = await api.getAllCategories();
  }

  // async getProductsData(page: number) {
  //   const data = await api.getProductsForPage(page);

  //   // const c = sortProductsById(data, 'cb0f9315-4738-41de-bdd5-92be6ca24d99');
  //   // console.log(c);

  //   const products: IProductResponseData[] = data.results;

  //   const c = sortProductsById(products, '60a0f357-d8f4-41cc-b411-d29584713bc5');
  //   console.log(c);

  //   this.productsCount = data.total;
  //   console.log(products);
  //   const productsData: IProductCard[] = products.map((el: IProductResponseData) => {
  //     return {
  //       imgSrc: el.masterData.current.masterVariant.images[0].url,
  //       category: this.setCategoryName(el),
  //       name: el.masterData.current.name['en-US' as keyof typeof el.masterData.current.name],
  //       price: el.masterData.current.masterVariant.prices[0].value.centAmount,
  //       discountedPrice: this.setDiscountedPrice(el),
  //     };
  //   });
  //   return productsData;
  // }

  // setCategoryName(product: IProductResponseData): string {
  //   let categoryName = '';
  //   this.categories.forEach((categoryItem: { id: string; name: { [x: string]: string } }) => {
  //     if (categoryItem.id === product.masterData.current.categories[0].id) {
  //       categoryName = categoryItem.name['en-US' as keyof typeof categoryItem.name];
  //     }
  //   });
  //   return categoryName;
  // }

  // setDiscountedPrice(product: IProductResponseData) {
  //   return product.masterData.current.masterVariant.prices[0].discounted !== undefined
  //     ? product.masterData.current.masterVariant.prices[0].discounted.value.centAmount
  //     : 0;
  // }

  getProductsCount() {
    return this.productsCount;
  }

  async getFilteredData(page: number, filter: TypeEndpoints) {
    const data = await api.filterProducts(page, filter);

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
