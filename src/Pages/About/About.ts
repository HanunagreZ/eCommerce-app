import Div from '../../ui-components/Div/Div';
import Journey from './Journey/JourneyDescription';
import Person from './Cast/Person';
import { EvgeniyaInfo, AlekseyInfo, VitalInfo } from './Cast/Cast';
import { EvgHobbits, AlexHobbits, VitHobbits } from './Journey/journeyInfo';
import './About.scss';

export default class About {
  private container: Div;
  private slider: Div;
  private contentContainer: Div;
  private journey: Journey;
  private Evg: Person;
  private Alx: Person;
  private Vit: Person;
  private slidesContainer: Div;
  private sliderButtons: Div;
  private aboutContainer: Div;
  constructor() {
    this.container = new Div('about-us');
    this.aboutContainer = new Div('about-us__container');
    this.contentContainer = new Div('about-us__content');
    this.journey = new Journey();
    this.journey.get().get().classList.add('about-us__element');
    this.slider = new Div('about-us__slider');
    this.slidesContainer = new Div('about-us__slides-container');
    this.Evg = new Person(EvgeniyaInfo, EvgHobbits);
    this.Alx = new Person(AlekseyInfo, AlexHobbits);
    this.Vit = new Person(VitalInfo, VitHobbits);
    this.sliderButtons = new Div('about-slider__buttons');
    const sliderButtonsArray: HTMLButtonElement[] = [];
    for (let i = 0; i < 4; i += 1) {
      const sliderButton = document.createElement('button');
      sliderButton.classList.add(`about-slider__button${i}`);
      sliderButton.classList.add('about-slider__button');
      sliderButtonsArray.push(sliderButton);
      this.sliderButtons.get().append(sliderButton);
    }
    let currentSlide = 1;
    sliderButtonsArray[currentSlide - 1].classList.add('about-slider__button_active');
    sliderButtonsArray.forEach((el, idx) => {
      el.addEventListener('click', () => {
        sliderButtonsArray.forEach((button) => button.classList.remove('about-slider__button_active'));
        this.slidesContainer.get().style.transform = `translateX(-${idx * 100}%)`;
        currentSlide = idx + 1;
        el.classList.add('about-slider__button_active');
        if (currentSlide === 1) {
          window.scrollTo(0, 0);
        } else {
          window.scrollTo(0, 200);
        }
      });
    });
  }
  render() {
    this.slidesContainer.get().append(this.journey.render(), this.Evg.render(), this.Alx.render(), this.Vit.render());
    this.slider.get().append(this.slidesContainer.get(), this.sliderButtons.get());
    this.contentContainer.get().append(this.slider.get());
    this.aboutContainer.get().append(this.contentContainer.get());
    this.container.get().append(this.aboutContainer.get());
    return this.container.get();
  }
}
