class UserState {
  setAccessToken(data: string) {
    document.cookie = `accessToken=${data}`;
  }
  getAccessToken(): string | null {
    return this.getCookie('accessToken');
  }
  removeAccessToken() {
    document.cookie = 'accessToken=accessToken; max-age=0';
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
    document.cookie = `userName=${data}`;
  }
  getUserName() {
    return this.getCookie('userName');
  }
  removeUserName() {
    document.cookie = 'userName=userName; max-age=0';
  }
  removeState() {
    this.removeAccessToken();
    this.removeRefreshToken();
    this.removeUserName();
  }
  getCookie(name: string): string | null {
    const cookie = document.cookie.split('; ').find((el) => el.startsWith(name + '='));
    return cookie ? cookie.split('=')[1] : null;
  }
}

const userState = new UserState();
export default userState;
