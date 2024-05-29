import { IRoute } from '../interfaces/interfaces';
import Page404 from '../pages/404/404';
import MainPage from '../Pages/Main/Main';
//import ProductsPage from '../../pages/Products/Products';
import Login from '../pages/Login/Login';
import Registration from '../pages/Registration/Registration';
import {
  popCatalog,
  marvelCatalog,
  accessoriesCatalog,
  animeCatalog,
  starWarsCatalog,
  allCatalog,
} from '../Pages/Products/CatalogPages';

import Profile from '../Pages/Profile/Profile';

// Сюда импортируются вьюшки страниц, и прописываются в "component"
// При определенноп path: прорисовывается такая-то страница

export const routes: IRoute[] = [
  { path: '/', component: new MainPage().render() },
  { path: '/registration', component: new Registration().render() },
  { path: '/login', component: new Login().render() },
  { path: '/catalog', component: allCatalog },
  { path: '/catalog/pop', component: popCatalog },
  { path: '/catalog/accessories', component: accessoriesCatalog },
  { path: '/catalog/pop/marvel', component: marvelCatalog },
  { path: '/catalog/pop/anime', component: animeCatalog },
  { path: '/catalog/pop/starwars', component: starWarsCatalog },
  { path: '/profile', component: new Profile().render() },
  // { path: '/products[id]', component: '<h1>Single Product Page</h1>' },

  // { path: '/basket', component: '<h1>Basket Page</h1>' },
  // { path: '/about', component: '<h1>About Us Page</h1>' },
  { path: '/404 ', component: new Page404().render() },
];
