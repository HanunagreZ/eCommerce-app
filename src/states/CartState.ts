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
}

const cartState = new CartState();
export default cartState;
