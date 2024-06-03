export default function createPriceElement(price: number, classValue?: string): HTMLHeadingElement {
  const priceElement = document.createElement('h3');
  const priceCents = price;
  const cents = priceCents % 100 === 0 ? '.00' : '.' + (priceCents % 100).toString();
  const priceInDollars = '$' + Math.floor(priceCents / 100).toString() + cents;
  priceElement.textContent = priceInDollars;
  if (classValue) {
    priceElement.classList.add(classValue);
  }
  return priceElement;
}
