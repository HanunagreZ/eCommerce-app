import '../styles.scss';
import header from './Header/Header';
import footer from './Footer/Footer';

class App {
  private element: HTMLDivElement;
  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('app');
    this.element.style.backgroundImage = 'url(assets/background.svg)';
    header.render(document.body);
    document.body.append(this.element);
    footer.render(document.body);
  }

  render() {}
}

const app = new App();
export default app;
