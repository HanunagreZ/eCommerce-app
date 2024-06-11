import userState from './UserState';

class CartState {
  getCartId(): string | null {
    if (userState.getAnonymousCartId()) return userState.getAnonymousCartId();
    if (userState.getCustomerCartId()) return userState.getCustomerCartId();
    return null;
  }

  getCartVersion(): number | null {
    if (userState.getAnonymousCartVersion()) return Number(userState.getAnonymousCartVersion());
    if (userState.getAnonymousCartVersion()) return Number(userState.getAnonymousCartVersion());
    return null;
  }

  setCartVersion(cartVersion: string) {
    if (userState.getAnonymousCartId()) userState.setAnonymousCartVersion(cartVersion);
    if (userState.getCustomerCartId()) userState.setCustomerCartVersion(cartVersion);
  }
}

const cartState = new CartState();
export default cartState;
