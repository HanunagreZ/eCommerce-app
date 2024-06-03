import { IRoute } from '../../interfaces/interfaces';
import userState from '../../states/UserState';
import Loading from '../Loading/Loading';
import getPaths from '../../api/getPaths';
// import Loading from '../Loading/Loading';
// import app from '../App';

class Router {
  private root: HTMLElement;
  private routes: IRoute[];

  constructor(root: HTMLElement, routeList: IRoute[]) {
    this.root = root;
    this.routes = routeList;
    window.addEventListener('popstate', this.route.bind(this));
    this.handleLinkClicks();
    this.updateRoutes();
    this.route();
  }

  public getRotes() {
    return this.routes;
  }

  public addRoute(route: IRoute) {
    if (!this.routes.includes(route)) this.routes.push(route);
  }

  private async updateRoutes() {
    getPaths().then((data) =>
      data.forEach((route) => {
        this.addRoute(route);
      }),
    );
  }

  private async route() {
    // const patcs = await this.updateRoutes()
    await this.updateRoutes();
    const { pathname } = window.location;
    async function executeRouting(path: string, routes: IRoute[], root: HTMLElement) {
      console.log('execute');
      const matchedRoute = routes.find((route) => route.path === pathname);
      if (!matchedRoute) {
        const page404 = routes.find((route) => route.path.includes('404'));
        if (page404) {
          root.innerHTML = '';
          const component = await page404.component;
          root.appendChild(component);
        }
        console.log('404 RETURN');
        return;
      }
      const { component } = matchedRoute;

      root.innerHTML = '';
      const resolvedComponent = await component;
      root.appendChild(resolvedComponent);
    }

    if (pathname.includes('/catalog')) {
      /* 😎 костыль 🤙 */
      const loader = new Loading();
      setTimeout(() => {
        window.scrollTo(0, 0);
        executeRouting(pathname, this.routes, this.root);
        loader.remove();
      }, 600);
    } else if (
      (pathname === '/login' && userState.getUserName()) ||
      (pathname === '/registration' && userState.getUserName()) ||
      (pathname === '/profile' && !userState.getUserName())
    ) {
      this.navigateTo('/');
    } else {
      executeRouting(pathname, this.routes, this.root);
    }
    //   window.scrollTo(0, 0);
    //   const loader = await new Loading();

    //   await executeRouting();
    //   loader.remove();
    // }
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
