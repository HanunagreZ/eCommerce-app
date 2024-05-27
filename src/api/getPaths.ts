import api from '../Api';
import ProductPage from '../Pages/Product/Product';
import { IRoute } from '../interfaces/interfaces';

interface ProductInfo {
  category: string;
  header: string;
  price: string;
  description: string;
  imgUrl: string;
}

interface Product {
  categories: {
    id: string;
    obj: {
      ancestors: {
        id: string;
        obj: {
          slug: {
            'en-US': string;
          };
          orderHint: number;
        };
      }[];
      name: { 'en-US': string };
      slug: {
        'en-US': string;
      };

      orderHint: number;
    };
  }[];
  masterVariant: {
    images: { url: string }[];
  };
  name: { 'en-US': string };
  description: { 'en-US': string };
  slug: { 'en-US': string };
}

async function getPaths() {
  const newRoutes: IRoute[] = [];
  const info = await api.getExtendedProducts();
  const productPaths: string[] = [];
  const categoriesPaths: string[] = [];
  const subCategoryPaths: string[] = [];
  info.forEach((product: Product) => {
    let productPath = '';
    let subCategory = '';
    let category = '';
    productPath += product.slug['en-US'];
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
      productPath = '/products' + '/' + productPath;
    }
    if (subCategory.length !== 0) {
      subCategory = '/products' + '/' + subCategory;
    }
    if (!subCategoryPaths.includes(subCategory) && subCategory.length !== 0) {
      subCategoryPaths.push(subCategory);
    }
    category = '/products' + category;
    if (!categoriesPaths.includes(category)) {
      categoriesPaths.push(category);
    }
    productPaths.push(productPath);
    let imgPath = '';
    imgPath = product.masterVariant.images[0].url;
    const productInfo: ProductInfo = {
      category: product.categories[0].obj.name['en-US'],
      header: product.name['en-US'],
      price: '10$',
      description: product.description['en-US'],
      imgUrl: imgPath,
    };

    const page = new ProductPage(productInfo).render();
    const route: IRoute = { path: productPath, component: page };
    newRoutes.push(route);
  });
  console.log(newRoutes);
  return newRoutes;
}

// getPaths().then((data) =>
//   data.forEach((route) => {
//     router.addRoute(route);
//   }),
// );

export default getPaths;
