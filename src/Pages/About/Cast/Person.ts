import { IPerson } from '../../../interfaces/interfaces';
import Div from '../../../ui-components/Div/Div';
import createTextInfo from './createInfoText';

export default class Person {
  private container: Div;
  private imgBlock: Div;
  private img: HTMLImageElement;
  private infoBlock: Div;
  private infoHeader: HTMLHeadingElement;
  private infoContent: HTMLParagraphElement;
  private ico: HTMLImageElement;
  constructor(personInfo: IPerson) {
    this.container = new Div('person');
    this.imgBlock = new Div('person__img-container');
    this.img = document.createElement('img');
    this.img.classList.add('person__img');
    this.img.src = personInfo.imgUrl;
    this.img.alt = personInfo.nickname;
    this.infoBlock = new Div('person__info');
    this.infoHeader = document.createElement('h2');
    this.infoHeader.textContent = 'Cast:';
    this.infoContent = createTextInfo(personInfo);
    this.ico = document.createElement('img');
    this.ico.classList.add('person__ico');
    this.ico.src = personInfo.icoUrl;
    this.ico.alt = personInfo.nickname;
  }
  render() {
    this.imgBlock.get().append(this.img);
    this.infoBlock.get().append(this.infoHeader, this.infoContent, this.ico);
    this.container.get().append(this.imgBlock.get(), this.infoBlock.get());
    return this.container.get();
  }
}
