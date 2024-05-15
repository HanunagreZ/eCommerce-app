import './Registration.scss';
import InputField from '../../components/InputField/InputField';
import { ICustomerRegistration, IRegistrationData } from '../../interfaces/interfaces';
import { constants } from '../../data/data';
import Button from '../../ui-components/Button/Button';
import { CheckInputs } from '../../utils/checkInputs';
import Span from '../../ui-components/Span/Span';
import Div from '../../ui-components/Div/Div';
import { FormatDate } from '../../utils/formatDate';
import Input from '../../ui-components/Input/Input';
import Label from '../../ui-components/Label/Label';
import { CheckAge } from '../../utils/checkAge';
import { IAddress } from '../../types/interfaces';
import Address from './Address';
import Link from '../../ui-components/Link/Link';
// import api from '../../Api';

export const registrationError = {
  count: 0,
};

export default class Registration {
  private form: HTMLFormElement;
  private inputFields: InputField[] = [];
  private dateOfBirth: InputField;
  private shippingAddressFields: Address;
  private shipAddrCheck: Input;
  private billingAddressFields: Address;
  private billAddrCheck: Input;
  private sameAddrCheck: Input;
  private button: Button;

  constructor() {
    this.form = document.createElement('form');
    this.form.classList.add('registration__form');

    this.dateOfBirth = new InputField(
      constants.registration.dateOfBirth.labelText,
      constants.registration.dateOfBirth.clueText,
    );

    this.shipAddrCheck = new Input('', 'registration__address_checkbox');

    this.shippingAddressFields = new Address();

    this.billingAddressFields = new Address();

    this.billAddrCheck = new Input('', 'registration__address_checkbox');
    this.sameAddrCheck = new Input('', 'registration__address_checkbox');
    this.sameAddrCheck.addListener(() => this.fillBillingAddress());

    this.button = this.button = new Button(constants.registration.buttonTitle, 'button');
    this.button.addListener((e: Event) => this.register(e));
  }

  addInputs(data: IRegistrationData[]) {
    data.forEach((el) => {
      const field = new InputField(el.labelText, el.clueText, el.reg, this.form);
      this.inputFields.push(field);
    });
  }

  render() {
    const formWrapper = new Div('registration__wrapper');
    new Span(constants.registration.formTitle, 'registration__title', this.form);
    const isLogined = new Div('registration__navigate-to-login', this.form);
    isLogined.get().innerText = constants.registration.haveAccount;
    new Link('/login', constants.registration.loginLink, isLogined.get());
    this.addInputs(constants.registration.generalData);
    this.dateOfBirth.render(this.form);
    FormatDate(this.dateOfBirth.input.get());

    new Span(constants.registration.shippingAddr, 'registration__address', this.form);
    this.shipAddrCheck.get().setAttribute('type', 'checkbox');
    this.shipAddrCheck.render(this.form);
    new Label(constants.registration.checkboxDefault, 'registration__address_label', this.form);

    this.shippingAddressFields.render(this.form);
    this.shippingAddressFields.getCountry().addListener(() => this.fillBillingAddress());
    this.shippingAddressFields.getAddressData().forEach((el) => {
      this.inputFields.push(el);
      el.input.addListener(() => this.fillBillingAddress());
    });

    const billAddressWrapper = new Div('registration__address_title', this.form);
    new Span(constants.registration.billingAddr, 'registration__address', billAddressWrapper.get());

    this.billAddrCheck.get().setAttribute('type', 'checkbox');
    this.billAddrCheck.render(billAddressWrapper.get());
    new Label(constants.registration.checkboxDefault, 'registration__address_label', billAddressWrapper.get());

    this.sameAddrCheck.get().setAttribute('type', 'checkbox');
    this.sameAddrCheck.render(billAddressWrapper.get());
    new Label(constants.registration.checkboxSameAddr, 'registration__address_label', billAddressWrapper.get());

    this.billingAddressFields.render(this.form);
    this.billingAddressFields.getAddressData().forEach((el) => this.inputFields.push(el));

    this.button.render(this.form);

    formWrapper.get().append(this.form);

    return formWrapper.get();
  }

  addAgeListener(): boolean {
    const isValidAge = this.dateOfBirth.addError(CheckAge(this.dateOfBirth.input.get().value));
    this.dateOfBirth.input.removeListener(() =>
      this.dateOfBirth.addError(CheckAge(this.dateOfBirth.input.get().value)),
    );
    this.dateOfBirth.input.addListener(() => this.dateOfBirth.addError(CheckAge(this.dateOfBirth.input.get().value)));
    return isValidAge;
  }

  fillBillingAddress() {
    const addressData = this.shippingAddressFields.getAddressData();
    if (this.sameAddrCheck.get().checked) {
      this.billingAddressFields.getCountry().get().value = this.shippingAddressFields.getCountry().get().value;
      this.billingAddressFields.getCountry().get().disabled = true;
      this.billingAddressFields.getAddressData().forEach((el, i) => {
        el.input.get().value = addressData[i].input.get().value;
        el.input.get().disabled = true;
        el.clue.get().classList.add('disabled');
        this.shippingAddressFields.getCountry().addListener(() => {
          this.billingAddressFields.changePostalCode();
        });
      });
    } else {
      this.billingAddressFields.getCountry().get().disabled = false;
      this.billingAddressFields.getAddressData().forEach((el) => {
        el.input.get().disabled = false;
        el.clue.get().classList.remove('disabled');
      });
      this.shippingAddressFields.getCountry().removeListener(() => {
        this.billingAddressFields.changePostalCode();
      });
    }
  }

  validateForm() {
    registrationError.count = 0;
    let isValidForm = false;
    const isValidGeneralData = CheckInputs(this.inputFields.slice(0, 4)); 
    const isValidDate = this.addAgeListener();
    if (!isValidDate && registrationError.count === 0) {
      this.dateOfBirth.get().scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'start' });
      registrationError.count = 1;
    }
    const isValidAddresses = CheckInputs(this.inputFields.slice(4));
    isValidForm = isValidGeneralData && isValidDate && isValidAddresses;
    return isValidForm;
  }

  register(e: Event) {
    e.preventDefault();
    if (this.validateForm()) {
      const inputValues = this.inputFields?.map((el) => el.input.get().value);
      const newDateOfBirth = this.dateOfBirth.input.get().value.split('.').reverse().join('-');
      const newShippingAddress: IAddress = {
        country:
          constants.registration.postalCodes[
            this.shippingAddressFields.getCountry().get().value as keyof typeof constants.registration.postalCodes
          ].countryCode,
        streetName: inputValues[5],
        postalCode: inputValues[6],
        city: inputValues[4],
      };

      const newBillingAddress: IAddress = {
        country:
          constants.registration.postalCodes[
            this.billingAddressFields.getCountry().get().value as keyof typeof constants.registration.postalCodes
          ].countryCode,
        streetName: inputValues[8],
        postalCode: inputValues[9],
        city: inputValues[7],
      };
      const requestData: ICustomerRegistration = {
        email: inputValues[0],
        password: inputValues[1],
        firstName: inputValues[2],
        lastName: inputValues[3],
        dateOfBirth: newDateOfBirth,
        addresses: [newShippingAddress, newBillingAddress],
        defaultShippingAddress: this.shipAddrCheck.get().checked ? 0 : -1,
        shippingAddresses: [0],
        defaultBillingAddress: this.billAddrCheck.get().checked ? 1 : -1,
        billingAddresses: [1],
      };
      console.log(requestData);
      // api.obtainAccessToken();
      // api.createCustomer(requestData);
    }
  }
}
