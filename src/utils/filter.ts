import { IProductResponseData } from '../interfaces/interfaces';

export function sortProductsById(products: IProductResponseData[], id: string) {
  console.log(products);
  const result = products.filter((product) => product.masterData.current.categories[0].id === id);
  return result;
}
