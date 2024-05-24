import api from '../Api';
import { IProductCard } from '../interfaces/interfaces';

class CatalogState {
  async getProductsData(page: number) {
    const products = await api.getProductsForPage(page);
    const categories = await api.getAllCategories();
    console.log(products);
    const productsData: IProductCard[] = products.map(
      (el: {
        masterData: {
          current: {
            categories: { id: string }[];
            masterVariant: { images: { url: string }[]; prices: { value: { centAmount: number } }[] };
            name: { [x: string]: string };
          };
        };
      }) => {
        let categoryName = '';
        categories.forEach((categoryItem: { id: string; name: { [x: string]: string } }) => {
          if (categoryItem.id === el.masterData.current.categories[0].id)
            categoryName = categoryItem.name['en-US' as keyof typeof categoryItem.name];
        });
        return {
          imgSrc: el.masterData.current.masterVariant.images[0].url,
          category: categoryName,
          name: el.masterData.current.name['en-US' as keyof typeof el.masterData.current.name],
          price: `$ ${(el.masterData.current.masterVariant.prices[0].value.centAmount / 100).toFixed(2)}`,
        };
      },
    );
    return productsData;
  }

  async getProductsCount() {
    const allProducts = await api.queryProducts();
    return allProducts.length;
  }
}

const catalogState = new CatalogState();
export default catalogState;
