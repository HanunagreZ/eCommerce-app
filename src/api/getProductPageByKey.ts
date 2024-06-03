import api from '../Api';
import ProductPage from '../Pages/Product/Product';
import { IProductData, IProduct } from '../interfaces/interfaces';

export default async function getProductPageByKey(productKey: string) {
  const singleProductInfo: IProductData = await api.getProductByKey(productKey);
  const productInfo: IProduct = {
    category: singleProductInfo.current.categories[0].obj.name['en-US'],
    name: singleProductInfo.current.name['en-US'],
    prices: singleProductInfo.staged.masterVariant.prices,
    description: singleProductInfo.current.description['en-US'],
    img: singleProductInfo.current.masterVariant.images,
  };
  const page = new ProductPage(productInfo).render();
  return page;
}
