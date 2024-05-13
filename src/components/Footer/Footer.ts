import './footer.scss';
import Link from '../../ui-components/Link/Link';
import Span from '../../ui-components/Span/Span';
import Div from '../../ui-components/Div/Div';

class Footer {
  private element: HTMLElement;
  private logoContainer: Div;
  private schoolLink: Link;
  private schoolLogo: HTMLImageElement;
  private year: Span;

  constructor() {
    this.element = document.createElement('footer');
    this.element.classList.add('footer');

    this.logoContainer = new Div('footer__logo', this.element);
    this.schoolLink = new Link('https://rs.school/', '', this.logoContainer.get());
    this.schoolLogo = document.createElement('img');
    this.schoolLogo.src = 'assets/icons/iconRsschool.svg';
    this.schoolLink.get().append(this.schoolLogo);
    this.year = new Span(new Date().getFullYear().toString(), 'footer__year', this.element);
  }

  render(parentElement: HTMLElement) {
    parentElement.append(this.element);
  }
}

const footer = new Footer();
export default footer;
