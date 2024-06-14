import { IRoute } from '../../interfaces/interfaces';
import userState from '../../states/UserState';
// import Loading from '../Loading/Loading';
import getPaths from '../../api/getPaths';
import api from '../../Api';
import { reRenderCatalogs } from '../../Pages/Catalog/CatalogPages';
import AsyncLoading from '../Loading/AsyncLoading';
// import Loading from '../Loading/Loading';
// import app from '../App';

class Router {
  private root: HTMLElement;
  private routes: IRoute[];

  constructor(root: HTMLElement, routeList: IRoute[]) {
    this.updateRoutes();
    this.root = root;
    this.routes = routeList;
    window.addEventListener('popstate', this.route.bind(this));
    this.handleLinkClicks();
    this.route();
  }

  public getRotes() {
    return this.routes;
  }

  public addRoute(route: IRoute) {
    this.routes = this.routes.filter((el) => el.path !== route.path);

    if (!this.routes.includes(route)) this.routes.push(route);
  }

  public async updateRoutes() {
    await getPaths().then((data) =>
      data.forEach((route) => {
        this.addRoute(route);
      }),
    );
  }

  private async route() {
    await api.isRefreshTokenExist();
    const { pathname } = window.location;
    async function executeRouting(path: string, routes: IRoute[], root: HTMLElement) {
      const loader = new AsyncLoading();
      const matchedRoute = routes.find((route) => route.path === pathname);

      //const matchedRoute = routes.findLast((route) => route.path === pathname);
      if (!matchedRoute) {
        const page404 = routes.find((route) => route.path.includes('404'));
        if (page404) {
          root.innerHTML = '';
          const component = await page404.component;
          root.appendChild(component);
        }
        return;
      }
      const { component } = matchedRoute;

      root.innerHTML = '';
      const resolvedComponent = await component;
      root.appendChild(resolvedComponent);
      await loader.remove();
    }

    if (pathname.includes('/catalog')) {
      /* 😎 костыль 🤙 */
      // window.scrollTo(0, 0);
      // const loader = new Loading();
      // setTimeout(() => {
      //   this.updateRoutes();
      //   executeRouting(pathname, this.routes, this.root);
      //   loader.remove();
      // }, 1000);
      window.scrollTo(0, 0);
      const loader = new AsyncLoading();
      const asyncFn = async () => {
        await api.getAccessToken();
        await this.updateRoutes();
        executeRouting(pathname, this.routes, this.root);
        await loader.remove();
      };
      asyncFn();
    } else if (
      (pathname === '/login' && userState.getUserName()) ||
      (pathname === '/registration' && userState.getUserName())
    ) {
      this.navigateTo('/');
    } else if (pathname === '/profile' && !userState.getUserName()) {
      this.navigateTo('/login');
    } else {
      executeRouting(pathname, this.routes, this.root);
    }
    //   window.scrollTo(0, 0);
    //   const loader = await new Loading();

    //   await executeRouting();
    //  loader.remove();
    // }
    console.log('end');
  }

  public navigateTo(path: string) {
    reRenderCatalogs();

    // const pathObj = this.routes.find((elemet) => elemet.path === path);
    // if (pathObj && pathObj.path.split('/').length > 3) console.log(pathObj);

    // let oldPathObj: IRoute | undefined;
    // let NewPathObj: IRoute | undefined;
    // if (path.split('/').length > 3) oldPathObj = this.routes.find((elemet) => elemet.path === path);
    // if(oldPathObj){
    //   NewPathObj = {}
    // }

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
