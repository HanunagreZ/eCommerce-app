import { IPerson } from '../../../interfaces/interfaces';
import Div from '../../../ui-components/Div/Div';
import createTextInfo from './createInfoText';
import createImgBlock from '../Journey/createImgBlock';
// import { journeyInfo } from '../Journemy/journeyInfo';

export default class Person {
  private container: Div;
  private personDescription: Div;
  private imgBlock: Div;
  private img: HTMLImageElement;
  private infoBlock: Div;
  private infoHeader: HTMLHeadingElement;
  private infoContent: HTMLParagraphElement;
  private ico: HTMLImageElement;
  private description: Div;
  // private descriptionText: HTMLHeadingElement;
  private hobbitsBlock: HTMLDivElement;
  constructor(personInfo: IPerson, hobbitsImgUrls: string[]) {
    this.container = new Div('person');
    this.personDescription = new Div('person__description');
    this.container.get().classList.add('about-us__element');
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
    this.description = new Div('person-journey__description');
    // this.descriptionText = document.createElement('h3');
    // this.descriptionText.classList.add('person-journey__description');
    // this.descriptionText.textContent = journeyInfo;
    this.hobbitsBlock = createImgBlock(hobbitsImgUrls, 'person__hobbits');
  }
  render() {
    this.imgBlock.get().append(this.img);
    this.infoBlock.get().append(this.infoHeader, this.infoContent, this.ico);
    this.personDescription.get().append(this.imgBlock.get(), this.infoBlock.get());
    this.description.get().append(this.hobbitsBlock);
    this.container.get().append(this.personDescription.get(), this.description.get());
    return this.container.get();
  }
}
