class UserState {
  private userData: string;

  constructor() {
    this.userData = '';
  }

  setAccessToken(data: string) {
    localStorage.setItem('accessToken', data);
  }
  getAccessToken(): string | null {
    const accessToken = localStorage.getItem('accessToken');
    return accessToken;
  }
  removeAccessToken() {
    localStorage.removeItem('accessToken');
  }
  setRefreshToken(data: string) {
    document.cookie = `refreshToken=${data}`;
  }
  getRefreshToken() {
    return this.getCookie('refreshToken');
  }
  removeRefreshToken() {
    document.cookie = 'refreshToken=refreshToken; max-age=0';
  }
  setUserName(data: string) {
    localStorage.setItem('userName', data);
  }
  getUserName(): string | null {
    const userName = localStorage.getItem('userName');
    return userName;
  }
  removeUserName() {
    localStorage.removeItem('userName');
  }
  removeState() {
    this.removeAccessToken();
    this.removeRefreshToken();
    this.removeUserName();
    this.removeUserId();
    this.removeUserVersion();
    this.removeCustomerCartId();
    this.removeCustomerCartVersion();
    this.removeAnonymousCartId();
    this.removeAnonymousCartVersion();
  }
  getCookie(name: string): string | null {
    const cookie = document.cookie.split('; ').find((el) => el.startsWith(name + '='));
    return cookie ? cookie.split('=')[1] : null;
  }

  /* Добавил в рамках реализации профиля пользователя */
  setUserId(data: string) {
    localStorage.setItem('userId', data);
  }

  getUserId(): string | null {
    const userId = localStorage.getItem('userId');
    return userId;
  }

  removeUserId() {
    localStorage.removeItem('userId');
  }

  setUserVersion(data: string) {
    localStorage.setItem('userVersion', data);
  }

  getUserVersion(): number | null {
    const userVersion = localStorage.getItem('userVersion');
    return userVersion ? parseInt(userVersion) : null;
  }

  removeUserVersion() {
    localStorage.removeItem('userVersion');
  }

  setAnonymousCartId(data: string) {
    localStorage.setItem('anonymousCartId', data);
  }
  getAnonymousCartId(): string | null {
    const cartId = localStorage.getItem('anonymousCartId');
    return cartId;
  }

  setAnonymousCartVersion(data: string) {
    localStorage.setItem('anonymousCartVersion', data);
  }
  getAnonymousCartVersion(): string | null {
    const cartId = localStorage.getItem('anonymousCartVersion');
    return cartId;
  }

  removeAnonymousCartId() {
    localStorage.removeItem('anonymousCartId');
  }

  removeAnonymousCartVersion() {
    localStorage.removeItem('anonymousCartVersion');
  }

  setCustomerCartId(data: string) {
    localStorage.setItem('customerCartId', data);
  }
  getCustomerCartId(): string | null {
    const cartId = localStorage.getItem('customerCartId');
    return cartId;
  }

  setCustomerCartVersion(data: string) {
    localStorage.setItem('customerCartVersion', data);
  }
  getCustomerCartVersion(): string | null {
    const cartId = localStorage.getItem('customerCartVersion');
    return cartId;
  }

  removeCustomerCartId() {
    localStorage.removeItem('customerCartId');
  }

  removeCustomerCartVersion() {
    localStorage.removeItem('customerCartVersion');
  }
}

const userState = new UserState();
export default userState;
