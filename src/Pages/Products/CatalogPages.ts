import Catalog from './Products';
import { TypeEndpoints } from '../../data/productsEndpoints';

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

export { allCatalog, popCatalog, marvelCatalog, accessoriesCatalog, animeCatalog, starWarsCatalog };
