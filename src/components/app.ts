import '../styles.scss';
import header from './Header/Header';
import footer from './Footer/Footer';
import api from '../api/Api';

class App {
  private element: HTMLDivElement;
  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('app');
    this.element.style.backgroundImage = 'url(assets/background.svg)';
  }

  get() {
    return this.element;
  }

  async render() {
    await api.getAccessToken();
    await api.isRefreshTokenExist();
    await header.render(document.body);
    document.body.append(this.element);
    footer.render(document.body);
  }
}

const app = new App();
export default app;
