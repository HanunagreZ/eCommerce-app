import './Registration.scss';
import InputField from '../../components/InputField/InputField';
import { IRegistrationData } from '../../types/interfaces';
import constants from '../../types/constants';
import Button from '../../ui-components/Button/Button';
import { CheckInputs } from '../../utils/CheckInputs';
import Span from '../../ui-components/Span/Span';
import Div from '../../ui-components/Div/Div';
import { FormatDate } from '../../utils/FormatDate';
import Input from '../../ui-components/Input/Input';
import Label from '../../ui-components/Label/Label';
import { Address } from './Address';

export default class Registration {
  private form: HTMLFormElement;
  private inputFields: InputField[] = [];
  // private dateOfBirth: Input;
  private dateOfBirth: InputField;

  private billAddrCheck: Input;

  private billingAddressFields: Address;

  private shippingAddressFields: Address;

  private shipAddrCheck: Input;
  private sameAddrCheck: Input;

  private button: Button;
  constructor(parentElement: HTMLElement) {
    this.form = document.createElement('form');
    this.form.classList.add('registration__form');

    // this.dateOfBirth = new Input('', 'registration__date-of-birth');
    this.dateOfBirth = new InputField(
      constants.registration.dateOfBirth.labelText,
      constants.registration.dateOfBirth.clueText,
    );

    this.billAddrCheck = new Input('', 'registration__address_checkbox');

    this.billingAddressFields = new Address();

    this.shippingAddressFields = new Address();

    this.shipAddrCheck = new Input('', 'registration__address_checkbox');
    this.sameAddrCheck = new Input('', 'registration__address_checkbox');
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

    new Span(constants.registration.bilAddr, 'registration__address', this.form);
    this.billAddrCheck.get().setAttribute('type', 'checkbox');
    this.billAddrCheck.render(this.form);
    new Label(constants.registration.checkboxDefault, 'registration__address_label', this.form);

    this.billingAddressFields.render(this.form);
    this.billingAddressFields.getAddressIData().forEach((el) => this.inputFields.push(el));

    const shipAddressWrapper = new Div('registration_address_title', this.form);
    new Span(constants.registration.shipAddr, 'registration__address', shipAddressWrapper.get());

    this.shipAddrCheck.get().setAttribute('type', 'checkbox');
    this.shipAddrCheck.render(shipAddressWrapper.get());
    new Label(constants.registration.checkboxDefault, 'registration__address_label', shipAddressWrapper.get());

    this.sameAddrCheck.get().setAttribute('type', 'checkbox');
    this.sameAddrCheck.render(shipAddressWrapper.get());
    new Label(constants.registration.checkboxSameAddr, 'registration__address_label', shipAddressWrapper.get());

    this.shippingAddressFields.render(this.form);
    this.shippingAddressFields.getAddressIData().forEach((el) => this.inputFields.push(el));

    this.button.render(this.form);

    formWrapper.get().append(this.form);
  }

  checkAge(value: string): boolean {
    if (
      value === '' ||
      Number(value[0]) > 3 ||
      Number(value[3]) > 1 ||
      Number(value.slice(0, 2)) > 31 ||
      Number(value.slice(3, 5)) > 12 ||
      Number(value.slice(6)) < 1900
    )
      return false;
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
    const isValidAge = this.dateOfBirth.addError(this.checkAge(this.dateOfBirth.input.get().value));
    this.dateOfBirth.input.removeListener(() =>
      this.dateOfBirth.addError(this.checkAge(this.dateOfBirth.input.get().value)),
    );
    this.dateOfBirth.input.addListener(() =>
      this.dateOfBirth.addError(this.checkAge(this.dateOfBirth.input.get().value)),
    );
    return isValidAge;
  }

  register(e: Event) {
    e.preventDefault();

    console.log(this.billAddrCheck.get().checked);
    let isValidForm = false;
    const isValidDate = this.addAgeListener();
    isValidForm = CheckInputs(this.inputFields) && isValidDate;
    if (isValidForm) {
      const inputValues = this.inputFields?.map((el) => el.input.get().value);

      // const [email, password] = inputValues;

      //send API request
      console.log(inputValues);
    }
  }
}
