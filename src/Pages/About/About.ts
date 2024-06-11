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
  private buttonLeft: HTMLButtonElement;
  private buttonRight: HTMLButtonElement;
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
        }
      });
    });
    this.buttonLeft = document.createElement('button');
    this.buttonLeft.classList.add('slider__arrow-left', 'about__slider-arrow');
    this.buttonLeft.textContent = '←';
    this.buttonRight = document.createElement('button');
    this.buttonRight.classList.add('slider__arrow-right', 'about__slider-arrow');
    this.buttonRight.textContent = '→';
    this.buttonRight.addEventListener('click', () => {
      if (currentSlide < 4) {
        this.slidesContainer.get().style.transform = `translateX(-${currentSlide * 100}%)`;
        currentSlide++;
      } else if (currentSlide === 4) {
        currentSlide = 1;
        this.slidesContainer.get().style.transform = 'translateX(0)';
        window.scrollTo(0, 0);
      }
      sliderButtonsArray.forEach((el) => {
        el.classList.remove('about-slider__button_active');
      });
      sliderButtonsArray[currentSlide - 1].classList.add('about-slider__button_active');
    });
    this.buttonLeft.addEventListener('click', () => {
      console.log(currentSlide);
      if (currentSlide === 1) {
        currentSlide = 4;
        this.slidesContainer.get().style.transform = 'translateX(-300%)';
      } else if (currentSlide > 1) {
        currentSlide--;
        this.slidesContainer.get().style.transform = `translateX(-${(currentSlide - 1) * 100}%)`;
        if (currentSlide === 1) {
          window.scrollTo(0, 0);
        }
      }
      sliderButtonsArray.forEach((el) => {
        el.classList.remove('about-slider__button_active');
      });
      sliderButtonsArray[currentSlide - 1].classList.add('about-slider__button_active');
    });
  }
  render() {
    this.slidesContainer.get().append(this.journey.render(), this.Evg.render(), this.Alx.render(), this.Vit.render());
    this.slider.get().append(this.slidesContainer.get());
    //append
    this.contentContainer.get().append(this.slider.get(), this.buttonLeft, this.buttonRight);
    this.aboutContainer.get().append(this.contentContainer.get(), this.sliderButtons.get());
    this.container.get().append(this.aboutContainer.get());
    return this.container.get();
  }
}
