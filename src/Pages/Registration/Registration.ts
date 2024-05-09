import './Registration.scss';
import InputField from '../../components/InputField/InputField';
import { IRegistrationData } from '../../types/interfaces';
import constants from '../../types/constants';
import Button from '../../ui-components/Button/Button';
import { CheckAllInputs } from '../../utils/CheckAllInputs';
import Span from '../../ui-components/Span/Span';
import Div from '../../ui-components/Div/Div';

export default class Registration {
  private form: HTMLFormElement;
  private inputFields: InputField[] = [];
  private button: Button;
  constructor(parentElement: HTMLElement) {
    this.form = document.createElement('form');
    this.form.classList.add('registration__form');
    this.button = this.button = new Button('Register', 'button', this.form);
    this.button.addListener((e: Event) => this.register(e));
    this.render(parentElement);
  }
  addInputs(data: IRegistrationData[]) {
    data.forEach((el) => {
      const field = new InputField(this.form, el.labelText, el.clueText, el.reg);
      this.inputFields.push(field);
    });
  }
  render(parentElement: HTMLElement) {
    const formWrapper = new Div('registration__wrapper', parentElement);
    new Span(constants.registration.formTitle, 'registration__title', this.form);
    const isLogined = new Div('registration__navigate-to-login', this.form);
    isLogined.get().innerText = constants.registration.haveAccount;
    //TODO add link Log in
    this.addInputs(constants.registration.generalData);

    this.button.render(this.form);

    formWrapper.get().append(this.form);
  }
  register(e: Event) {
    e.preventDefault();
    let isValidForm = false;
    if (this.inputFields !== null) {
      isValidForm = CheckAllInputs(this.inputFields);
      if (isValidForm) {
        const inputValues = this.inputFields?.map((el) => el.input.get().value);

        const [email, password] = inputValues;

        //send API request
        console.log(email, password);
      }
    }
  }
}
