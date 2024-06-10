import userState from './UserState';

class CartState {
  getCartId() {
    const cartId = userState.getAnonymousCartId()
      ? String(userState.getAnonymousCartId())
      : String(userState.getCustomerCartId());
    return cartId;
  }

  getCartVersion() {
    const cartVersion = userState.getAnonymousCartVersion()
      ? Number(userState.getAnonymousCartVersion())
      : Number(userState.getCustomerCartVersion());
    return cartVersion;
  }

  // setCartId(cartId: string) {
  //   if (userState.getAnonymousCartId()) userState.setAnonymousCartId(cartId);
  //   if (userState.getCustomerCartId()) userState.setCustomerCartId(cartId);
  // }

  setCartVersion(cartVersion: string) {
    if (userState.getAnonymousCartId()) userState.setAnonymousCartVersion(cartVersion);
    if (userState.getCustomerCartId()) userState.setCustomerCartVersion(cartVersion);
  }
}

const cartState = new CartState();
export default cartState;
