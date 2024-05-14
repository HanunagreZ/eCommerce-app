import { IRoute } from '../../types/interfaces';

class Router {
  private root: HTMLElement;
  private routes: IRoute[];

  constructor(root: HTMLElement, routeList: IRoute[]) {
    this.root = root;
    this.routes = routeList;
    window.addEventListener('popstate', this.route.bind(this));
    this.route();
  }

  private route() {
    const { pathname } = window.location;
    const matchedRoute = this.routes.find((route) => route.path === pathname);
    if (!matchedRoute) {
      this.navigateTo('/404');
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
  }

  public navigateTo(path: string) {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
      this.route();
    }
  }
}

export default Router;
