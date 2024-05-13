export default class Page404 {
  render() {
    const elem = document.createElement('div');
    const header = document.createElement('h2');
    header.textContent = '404. Page Not Found';
    elem.appendChild(header);
    return elem;
  }
}
