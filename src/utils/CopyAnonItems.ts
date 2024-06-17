import api from '../api/Api';
import userState from '../states/UserState';

export async function CopyAnonItems(cartId: string) {
  if (userState.getAnonymousCartId()) {
    const anonCart = await api.getCartByID(String(userState.getAnonymousCartId()));
    const itemsData = anonCart.lineItems.map((el: { variant: { sku: string }; quantity: number }) => {
      return { sku: el.variant.sku, quantity: el.quantity };
    });

    for (let i = 0; i < itemsData.length; i++) {
      const newItem = await api.addLineItem(
        cartId,
        Number(userState.getCustomerCartVersion()),
        itemsData[i].sku,
        itemsData[i].quantity,
      );
      userState.setCustomerCartVersion(newItem.version);
    }

    userState.removeAnonymousCartId();
    userState.removeAnonymousCartVersion();
  }
}
