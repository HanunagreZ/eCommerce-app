export default class ProductsPage {
  render() {
    const elem = document.createElement('div');
    const header = document.createElement('h2');
    header.textContent = 'Products Page';
    const link = document.createElement('a');
    link.textContent = 'TO Main ';
    link.href = '/';
    elem.append(header, link);
    return elem;
  }
}
