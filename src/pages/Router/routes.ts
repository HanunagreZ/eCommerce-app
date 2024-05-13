import IRoute from './types';

const routes: IRoute[] = [
  { path: '/login', component: '<h1>Login Page</h1>' },
  { path: '/registration', component: '<h1>Registration Page</h1>' },
  { path: '/', component: '<h1>Main Page</h1>' },
  { path: '/products', component: '<h1>Catalog Page</h1>' },
  { path: '/products[id]', component: '<h1>Single Product Page</h1>' },
  { path: '/profile', component: '<h1>Profile Page</h1>' },
  { path: '/basket', component: '<h1>Basket Page</h1>' },
  { path: '/about', component: '<h1>About Us Page</h1>' },
  { path: '/404 ', component: '<h1>404. Page not found</h1>' },
];

export default routes;
