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
  constructor() {
    this.form = document.createElement('form');
    this.form.classList.add('login__form');
    this.button = new Button(constants.login.buttonTitle, 'button');
    this.button.addListener((e: Event) => this.login(e));
  }

  addInputs(data: IRegistrationData[]) {
    data.forEach((el) => {
      const field = new InputField(el.labelText, el.clueText, el.reg, this.form);
      this.inputFields.push(field);
    });
  }
  render() {
    const formWrapper = new Div('login__wrapper');
    new Span(constants.login.formTitle, 'login__title', this.form);
    const isLogined = new Div('login__navigate-to-login', this.form);
    isLogined.get().innerText = constants.registration.haveAccount;
    //TODO add link Register
    this.addInputs(constants.login.generalData);
    this.button.render(this.form);

    formWrapper.get().append(this.form);
    return formWrapper.get();
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
