import { IRoute } from '../../interfaces/interfaces';
import userState from '../../states/UserState';
// import app from '../App';

class Router {
  private root: HTMLElement;
  private routes: IRoute[];

  constructor(root: HTMLElement, routeList: IRoute[]) {
    this.root = root;
    this.routes = routeList;
    window.addEventListener('popstate', this.route.bind(this));
    this.route();
    this.handleLinkClicks();
  }

  private route() {
    const { pathname } = window.location;
    const matchedRoute = this.routes.find((route) => route.path === pathname);
    if (!matchedRoute) {
      // this.navigateTo('/404');
      const page404 = this.routes.find((route) => route.path.includes('404'));
      if (page404) {
        this.root.innerHTML = '';
        this.root.appendChild(page404.component);
      }
      return;
    }
    const { component } = matchedRoute;
    this.root.innerHTML = '';
    this.root.appendChild(component);
    if (
      (pathname === '/login' && userState.getUserName()) ||
      (pathname === '/registration' && userState.getUserName())
    ) {
      this.navigateTo('/');
    }
    console.log(pathname);
  }

  public navigateTo(path: string) {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
      this.route();
    }
  }
  private handleLinkClicks() {
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'A' && target.hasAttribute('href')) {
        const href = target.getAttribute('href');
        if (href && href.startsWith('/')) {
          event.preventDefault();
          this.navigateTo(href);
        }
      }
    });
  }
}

export default Router;
