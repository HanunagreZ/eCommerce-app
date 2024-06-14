import Catalog from './Catalog';
import { SortEndpoints, TypeEndpoints } from '../../data/productsEndpoints';

const allProducts = new Catalog();
allProducts.showProducts(TypeEndpoints.all);
const allCatalog = allProducts.render();

const popPage = new Catalog();
popPage.showProducts(TypeEndpoints.pop);
const popCatalog = popPage.render();

const accessoriesPage = new Catalog();
accessoriesPage.showProducts(TypeEndpoints.accessories);
const accessoriesCatalog = accessoriesPage.render();

const marvelPage = new Catalog();
marvelPage.showProducts(TypeEndpoints.marvel);
const marvelCatalog = marvelPage.render();

const animePage = new Catalog();
animePage.showProducts(TypeEndpoints.anime);
const animeCatalog = animePage.render();

const starWarsPage = new Catalog();
starWarsPage.showProducts(TypeEndpoints.starwars);
const starWarsCatalog = starWarsPage.render();

export function reRenderCatalogs() {
  allCatalog.then(() => {
    allProducts.renderProducts(1, TypeEndpoints.all, SortEndpoints.nameAZ);
  });

  popCatalog.then(() => {
    popPage.renderProducts(1, TypeEndpoints.pop, SortEndpoints.nameAZ);
  });

  accessoriesCatalog.then(() => {
    accessoriesPage.renderProducts(1, TypeEndpoints.accessories, SortEndpoints.nameAZ);
  });

  marvelCatalog.then(() => {
    marvelPage.renderProducts(1, TypeEndpoints.marvel, SortEndpoints.nameAZ);
  });

  animeCatalog.then(() => {
    animePage.renderProducts(1, TypeEndpoints.anime, SortEndpoints.nameAZ);
  });

  starWarsCatalog.then(() => {
    starWarsPage.renderProducts(1, TypeEndpoints.starwars, SortEndpoints.nameAZ);
  });
}

export { allCatalog, popCatalog, marvelCatalog, accessoriesCatalog, animeCatalog, starWarsCatalog };
