import api from '../../api/Api';
import ProductPage from './Product';
import { IProductData, IProduct } from '../../interfaces/interfaces';
import cartState from '../../states/CartState';
import { getNeededCartData } from '../../utils/GetNeededCartData';

export default async function getProductPageByKey(productKey: string) {
  let productsInCart: string[] = [];
  if (cartState.getCartId() !== null) {
    const response = await api.getCartByID(String(cartState.getCartId()));
    productsInCart = getNeededCartData(response).lineItems.map((el) => el.name);
  }

  const singleProductInfo: IProductData = await api.getProductByKey(productKey);

  const productInfo: IProduct = {
    category: singleProductInfo.categories[0].obj.name['en-US'],
    name: singleProductInfo.name['en-US'],
    prices: singleProductInfo.masterVariant.prices[0],
    description: singleProductInfo.description['en-US'],
    img: singleProductInfo.masterVariant.images,
    sku: singleProductInfo.masterVariant.sku,

    isInCart: productsInCart.includes(singleProductInfo.name['en-US']),
  };

  const page = new ProductPage(productInfo).render();
  return page;
}
