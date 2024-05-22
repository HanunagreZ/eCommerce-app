import api from '../Api';

export class CatalogState {
  async getProducts() {
    const products = await api.queryProducts();
    return products();
  }
}
