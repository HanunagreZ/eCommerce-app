import { CartItemData, CartApiData, ICartData } from '../interfaces/interfaces';

export function getNeededCartData(cartData: CartApiData): ICartData {
  const items = cartData.lineItems;
  const lineitems: CartItemData[] = [];
  items.forEach((el) => {
    lineitems.push({
      id: el.id,
      imgUrl: el.variant.images[0].url,
      name: el.name['en-US'],
      quantity: el.quantity,
      price: el.price.value.centAmount / 100,
      discountedPrice: el.price.discounted !== undefined ? el.price.discounted.value.centAmount / 100 : 0,
    });
  });

  // console.log(lineItems);
  return {
    lineItems: lineitems,
    totalQuantity: cartData.totalLineItemQuantity,
    totalPrice: cartData.totalPrice.centAmount / 100,
  };
}
