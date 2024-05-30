import { IRoute } from '../../interfaces/interfaces';
import userState from '../../states/UserState';
import Loading from '../Loading/Loading';
import getPaths from '../../api/getPaths';
// import Loading from '../Loading/Loading';
// import app from '../App';

class Router {
  private root: HTMLElement;
  private routes: IRoute[];
  // private routesMap: Map;

  constructor(root: HTMLElement, routeList: IRoute[]) {
    this.root = root;
    this.routes = routeList;
    window.addEventListener('popstate', this.route.bind(this));
    this.route();
    this.handleLinkClicks();
    getPaths().then((data) =>
      data.forEach((route) => {
        this.addRoute(route);
      }),
    );
  }

  public getRotes() {
    return this.routes;
  }

  public addRoute(route: IRoute) {
    this.routes.push(route);
  }

  private async route() {
    const { pathname } = window.location;
    const executeRouting = async () => {
      const matchedRoute = this.routes.find((route) => route.path === pathname);
      if (!matchedRoute) {
        const page404 = this.routes.find((route) => route.path.includes('404'));
        if (page404) {
          this.root.innerHTML = '';
          const component = await page404.component;
          this.root.appendChild(component);
        }
        return;
      }
      const { component } = matchedRoute;
      this.root.innerHTML = '';
      const resolvedComponent = await component;
      this.root.appendChild(resolvedComponent);
      if (
        (pathname === '/login' && userState.getUserName()) ||
        (pathname === '/registration' && userState.getUserName())
      ) {
        this.navigateTo('/');
      }
    };
    if (pathname.includes('/catalog')) {
      /* 😎 костыль 🤙 */
      window.scrollTo(0, 0);
      const loader = new Loading();
      setTimeout(() => {
        executeRouting();
        loader.remove();
      }, 500);
    } else {
      executeRouting();
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
      console.log(this.getRotes(), ' RRR');
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
