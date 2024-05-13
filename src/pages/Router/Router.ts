// import routes from './routes';

// class Router {
//   private readonly root: HTMLElement;

//   constructor(parameters) {
//     this.root = parameters.root || document.body;
//   }

//   render(pageUI) {
//     this.root.innerHTML = '';
//     let page: HTMLElement = pageUI.render();
//     this.root.appendChild(page);
//   }

//   loadPage(path) {
//     const page = routes.layout;

//     this.render(page);
//     document.title;
//   }
// }
// router.ts
const app = document.querySelector('#app');

import routes from './routes';
console.log(routes);

interface Route {
  path: string;
  component: string;
}

class Router {
  private routes: Route[];

  constructor(routeList: Route[]) {
    this.routes = routeList;
    window.addEventListener('popstate', this.route.bind(this));
    this.route();
  }

  private route() {
    const { pathname } = window.location;
    console.log(pathname);
    if (pathname.includes('products')) console.log(pathname);
    const matchedRoute = this.routes.find((route) => route.path === pathname);
    if (!matchedRoute) {
      this.navigateTo('/404');
      const page404 = this.routes.find((route) => route.path.includes('404'));
      if (app && page404) app.innerHTML = page404?.component;
      return;
    }

    const { component } = matchedRoute;
    const pageComponent = component;

    if (app) app.innerHTML = pageComponent;

    // Render the pageElement...
  }

  public navigateTo(path: string) {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
      this.route();
    }
  }
}

export default Router;
