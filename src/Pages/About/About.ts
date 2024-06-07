import Div from '../../ui-components/Div/Div';
import Journey from './Journey/JourneyDescription';
import Person from './Cast/Person';
import { EvgeniyaInfo, AlekseyInfo, VitalInfo } from './Cast/Cast';
import './About.scss';

export default class About {
  private container: Div;
  private journey: Journey;
  private Evg: Person;
  private Alx: Person;
  private Vit: Person;
  constructor() {
    this.container = new Div('about-us');
    this.journey = new Journey();
    this.Evg = new Person(EvgeniyaInfo);
    this.Alx = new Person(AlekseyInfo);
    this.Vit = new Person(VitalInfo);
  }
  render() {
    this.container.get().append(this.journey.render(), this.Evg.render(), this.Alx.render(), this.Vit.render());
    return this.container.get();
  }
}
