// import { TypeEndpoints } from '../../data/productsEndpoints';
import catalogState, { CatalogState } from '../../states/CatalogState';

class CatalogProxy {
  private catalogState: CatalogState;
  public isfilterActive: boolean;
  constructor(catalog: CatalogState) {
    this.catalogState = catalog;
    this.isfilterActive = false;
  }

  // async renderCatalog(page: number, filter: TypeEndpoints | undefined) {
  //   let result;
  //   if (filter === undefined) {
  //     result = await this.catalogState.getProductsData(page);
  //     this.isfilterActive = false;
  //   } else {
  //     result = await this.catalogState.getFilteredData(page, filter);
  //     this.isfilterActive = true;
  //   }

  //   return result;
  // }
}

const catalogProxy = new CatalogProxy(catalogState);
export default catalogProxy;
