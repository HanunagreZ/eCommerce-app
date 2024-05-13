import './Login.scss';
import InputField from '../../components/InputField/InputField';
import constants from '../../types/constants';
import { IRegistrationData } from '../../types/interfaces';
import Div from '../../ui-components/Div/Div';
import Span from '../../ui-components/Span/Span';
import Button from '../../ui-components/Button/Button';
import { CheckInputs } from '../../utils/CheckInputs';

export default class Login {
  private form: HTMLFormElement;
  private inputFields: InputField[] = [];
  private button: Button;
  constructor(parentElement: HTMLElement) {
    this.form = document.createElement('form');
    this.form.classList.add('login__form');
    this.button = this.button = new Button('Log in', 'button');
    this.button.addListener((e: Event) => this.login(e));
    this.render(parentElement);
  }

  addInputs(data: IRegistrationData[]) {
    data.forEach((el) => {
      const field = new InputField(el.labelText, el.clueText, el.reg, this.form);
      this.inputFields.push(field);
    });
  }
  render(parentElement: HTMLElement) {
    const formWrapper = new Div('login__wrapper', parentElement);
    new Span(constants.login.formTitle, 'login__title', this.form);
    const isLogined = new Div('login__navigate-to-login', this.form);
    isLogined.get().innerText = constants.registration.haveAccount;
    //TODO add link Log in
    this.addInputs(constants.login.generalData);
    this.button.render(this.form);

    formWrapper.get().append(this.form);
  }
  login(e: Event) {
    e.preventDefault();
    let isValidForm = false;
    isValidForm = CheckInputs(this.inputFields);
    if (isValidForm) {
      const inputValues = this.inputFields?.map((el) => el.input.get().value);

      console.log(inputValues);
    }
  }
}
