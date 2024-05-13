import IRoute from './types';
import Page404 from '../404/404';
import MainPage from '../Main/main';
import ProductsPage from '../Products/Products';

// Сюда импортируются вьюшки страниц, и прописываются в "component"
// При определенноп path: прорисовывается такая-то страница

const routes: IRoute[] = [
  { path: '/', component: new MainPage().render() },
  // { path: '/registration', component: '<h1>Registration Page</h1>' },
  // { path: '/login', component: new LoginPage().render() },
  { path: '/products', component: new ProductsPage().render() },
  // { path: '/products[id]', component: '<h1>Single Product Page</h1>' },
  // { path: '/profile', component: '<h1>Profile Page</h1>' },
  // { path: '/basket', component: '<h1>Basket Page</h1>' },
  // { path: '/about', component: '<h1>About Us Page</h1>' },
  { path: '/404 ', component: new Page404().render() },
];

export default routes;
