export default function addBreadcrumbs(category: string) {
  const hrefs = ['/', 'catalog'];
  const text = ['Funko', 'Catalog'];
  if (category === 'Accessories') {
    hrefs.push('catalog/accessories');
    text.push('Accessories');
  } else {
    hrefs.push('catalog/pop');
    hrefs.push('catalog/pop/' + category.toLowerCase().replace(' ', '-'));
    text.push('Pop');
    const categ = category[0].toUpperCase() + category.slice(1, category.length);
    text.push(categ);
  }
  return { hrefs, text };
}
