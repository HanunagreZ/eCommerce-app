import './Registration.scss';
import InputField from '../../components/InputField/InputField';
import { IRegistrationData } from '../../types/interfaces';
import constants from '../../types/constants';
import Button from '../../ui-components/Button/Button';
import { CheckAllInputs } from '../../utils/CheckInputs';
import Span from '../../ui-components/Span/Span';
import Div from '../../ui-components/Div/Div';
import { FormatDate } from '../../utils/FormatDate';

export default class Registration {
  private form: HTMLFormElement;
  private inputFields: InputField[] = [];
  // private dateOfBirth: Input;
  private dateOfBirth: InputField;

  private button: Button;
  constructor(parentElement: HTMLElement) {
    this.form = document.createElement('form');
    this.form.classList.add('registration__form');

    // this.dateOfBirth = new Input('', 'registration__date-of-birth');
    this.dateOfBirth = new InputField(
      constants.registration.dateOfBirth.labelText,
      constants.registration.dateOfBirth.clueText,
    );
    this.button = this.button = new Button('Register', 'button');
    this.button.addListener((e: Event) => this.register(e));
    this.render(parentElement);
  }
  addInputs(data: IRegistrationData[]) {
    data.forEach((el) => {
      const field = new InputField(el.labelText, el.clueText, el.reg, this.form);
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

    // this.dateOfBirth.get().setAttribute('type', 'date');
    // this.dateOfBirth.render(this.form);

    this.dateOfBirth.render(this.form);
    FormatDate(this.dateOfBirth.input.get());

    this.button.render(this.form);

    formWrapper.get().append(this.form);
  }

  checkAge(value: string): boolean {
    if (value === '') return false;
    const dateElements = value
      .split('.')
      .map((el) => Number(el))
      .reverse();
    const dateValue = new Date(dateElements[0], dateElements[1] - 1, dateElements[2]);
    const today = new Date();
    let age = today.getFullYear() - dateValue.getFullYear();
    if (
      today.getMonth() < dateValue.getMonth() ||
      (today.getMonth() === dateValue.getMonth() && today.getDate() < dateValue.getDate())
    ) {
      age--;
    }
    if (age < 14 || age > 130) {
      return false;
    }
    return true;
  }

  addAgeListener(): boolean {
    const isValidAge =
      this.dateOfBirth.addError(this.checkAge(this.dateOfBirth.input.get().value));
    this.dateOfBirth.input.removeListener(() =>
      this.dateOfBirth.addError(this.checkAge(this.dateOfBirth.input.get().value)),
    );
    this.dateOfBirth.input.addListener(() =>
      this.dateOfBirth.addError(this.checkAge(this.dateOfBirth.input.get().value)),
    );
    console.log(isValidAge);
    return isValidAge;
  }

  register(e: Event) {
    e.preventDefault();
    let isValidForm = false;
    const isValidDate = this.addAgeListener();
    isValidForm = CheckAllInputs(this.inputFields) && isValidDate;
    if (isValidForm) {
      const inputValues = this.inputFields?.map((el) => el.input.get().value);

      const [email, password] = inputValues;

      //send API request
      console.log(email, password);
    }
  }
}
