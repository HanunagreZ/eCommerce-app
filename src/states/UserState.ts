class UserState {
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
  }
  getCookie(name: string): string | null {
    const cookie = document.cookie.split('; ').find((el) => el.startsWith(name + '='));
    return cookie ? cookie.split('=')[1] : null;
  }
}

const userState = new UserState();
export default userState;
