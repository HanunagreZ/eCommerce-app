import Div from '../../../ui-components/Div/Div';
import createImgBlock from './createImgBlock';
import {
  journeyInfo,
  journeyHelp,
  journeyObstacles,
  journeyOffer,
  journeyResult,
  hobbitsImgs,
  enemyImgs,
  helpersImgs,
  pathImgs,
  createJourneyText,
} from './journeyInfo';

export default class Journey {
  private container: Div;
  private journeyDescription: Div;
  private hobbitsImg: HTMLDivElement;
  private journeyStory: HTMLParagraphElement;
  private journeyProblems: HTMLParagraphElement;
  private ObstaclesImg: HTMLDivElement;
  private journeyHelp: HTMLParagraphElement;
  private helpImg: HTMLDivElement;
  private journeyRes: HTMLParagraphElement;
  private resultImg: HTMLDivElement;
  private journeyFooter: Div;
  private journeyOffer: HTMLParagraphElement;
  private rsInfoContainer: Div;
  private rsSign: HTMLHeadingElement;
  private rsLinkLogo: HTMLAnchorElement;
  private rsImg: HTMLImageElement;

  constructor() {
    this.container = new Div('journey');
    this.journeyDescription = new Div('journey__description');
    this.journeyStory = createJourneyText(journeyInfo, 'journey__text');
    this.hobbitsImg = createImgBlock(hobbitsImgs, 'journey__hobbits');
    this.journeyProblems = createJourneyText(journeyObstacles, 'journey__problems');
    this.ObstaclesImg = createImgBlock(enemyImgs, 'journey__enemies');
    this.journeyHelp = createJourneyText(journeyHelp, 'journey__help');
    this.helpImg = createImgBlock(helpersImgs, 'journey__help-img');
    this.journeyRes = createJourneyText(journeyResult, 'journey__result');
    this.resultImg = createImgBlock(pathImgs, 'journey__path');
    this.journeyFooter = new Div('journey__footer');
    this.journeyOffer = createJourneyText(journeyOffer, 'journey__offer');
    this.rsInfoContainer = new Div('school__info-container');
    this.rsSign = document.createElement('h3');
    this.rsSign.textContent = 'GO TO SCHOOL ->';
    this.rsLinkLogo = document.createElement('a');
    this.rsLinkLogo.href = 'https://rs.school';
    this.rsImg = document.createElement('img');
    this.rsImg.src = './../../../assets/about/rs-logo.png';
    this.rsImg.alt = 'RS Logo';
  }
  render() {
    this.journeyDescription
      .get()
      .append(
        this.journeyStory,
        this.hobbitsImg,
        this.journeyProblems,
        this.ObstaclesImg,
        this.journeyHelp,
        this.helpImg,
        this.journeyRes,
        this.resultImg,
      );
    this.rsLinkLogo.append(this.rsImg);
    this.rsInfoContainer.get().append(this.rsSign, this.rsLinkLogo);
    this.container.get().append(this.journeyDescription.get(), this.rsInfoContainer.get());
    return this.container.get();
  }
}
