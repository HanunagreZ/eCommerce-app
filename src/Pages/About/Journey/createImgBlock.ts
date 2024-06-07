export default function createImgBlock(imgUrls: string[], classList: string): HTMLDivElement {
  const imgBlock = document.createElement('div');
  imgBlock.classList.add(classList);
  imgUrls.forEach((el) => {
    const img = document.createElement('img');
    img.classList.add(`${classList}__img`);
    img.src = el;
    img.alt = `${classList}__img`;
    imgBlock.append(img);
  });

  return imgBlock;
}
