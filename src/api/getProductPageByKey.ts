import api from '../Api';
import ProductPage from '../Pages/Product/Product';
import { IProductData, IProduct } from '../interfaces/interfaces';

export default async function getProductPageByKey(productKey: string) {
  const singleProductInfo: IProductData = await api.getProductByKey(productKey);
  const productInfo: IProduct = {
    category: singleProductInfo.categories[0].obj.name['en-US'],
    name: singleProductInfo.name['en-US'],
    prices: singleProductInfo.masterVariant.prices[0],
    description: singleProductInfo.description['en-US'],
    img: singleProductInfo.masterVariant.images,
  };
  const page = new ProductPage(productInfo).render();
  return page;
}
