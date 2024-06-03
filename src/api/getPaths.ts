import api from '../Api';
import { IRoute } from '../interfaces/interfaces';
import { Product } from '../interfaces/interfaces';
import getProductPageByKey from './getProductPageByKey';

async function getPaths() {
  const newRoutes: IRoute[] = [];
  const info = await api.getExtendedProducts();
  const categoriesPaths: string[] = [];
  const subCategoryPaths: string[] = [];
  const productKeys: string[] = [];

  info.forEach((product: Product) => {
    let productPath = '';
    let subCategory = '';
    let category = '';
    productPath += product.key;
    if (product.categories.length > 0) {
      productPath = product.categories[0].obj.slug['en-US'] + '/' + productPath;
      if (product.categories[0].obj.orderHint > 0.1) {
        category = '/' + product.categories[0].obj.slug['en-US'];
      } else {
        subCategory = product.categories[0].obj.slug['en-US'];
      }
    }
    if (product.categories[0].obj.ancestors.length > 0) {
      productPath = product.categories[0].obj.ancestors[0].obj.slug['en-US'] + '/' + productPath;
      category = '/' + product.categories[0].obj.ancestors[0].obj.slug['en-US'];
      if (subCategory) {
        subCategory = product.categories[0].obj.ancestors[0].obj.slug['en-US'] + '/' + subCategory;
      }
    }
    if (productPath[0] !== '/') {
      productPath = '/catalog' + '/' + productPath;
    }
    if (subCategory.length !== 0) {
      subCategory = '/catalog' + '/' + subCategory;
    }
    if (!subCategoryPaths.includes(subCategory) && subCategory.length !== 0) {
      subCategoryPaths.push(subCategory);
    }
    category = '/catalog' + category;
    if (!categoriesPaths.includes(category)) {
      categoriesPaths.push(category);
    }
    const productKey = product.key;
    productKeys.push(productKey);
    if (productKey == 'avatar') {
      console.log(api.getProductByKey(productKey));
    }
    const route: IRoute = { path: productPath, component: getProductPageByKey(productKey) };
    newRoutes.push(route);
  });
  return newRoutes;
}

export default getPaths;
