import InputField from '../../components/InputField/InputField';
import { constants } from '../../data/data';
import { IRegistrationData } from '../../interfaces/interfaces';
import Div from '../../ui-components/Div/Div';
import Label from '../../ui-components/Label/Label';
import Select from '../../ui-components/Select/Select';

export default class Address {
  private country: Select;
  private addressData: InputField[] = [];

  constructor(parentElement?: HTMLElement) {
    this.country = new Select('registration__country');
    if (parentElement) this.render(parentElement);
  }

  addInputs(data: IRegistrationData[], parentElement: HTMLElement) {
    data.forEach((el) => {
      const field = new InputField(el.labelText, el.clueText, el.reg, parentElement);
      this.addressData.push(field);
    });
  }

  render(parentElement: HTMLElement) {
    const countryContainer = new Div('input-field', parentElement);
    new Label(constants.registration.country, 'registration__country_label', countryContainer.get());

    constants.registration.countries
      .map((country) => {
        const countryOption = document.createElement('option');
        countryOption.innerText = country;
        return countryOption;
      })
      .map((country) => this.country.get().append(country));
    this.country.render(countryContainer.get());
    this.country.addListener(() => {
      this.changePostalCode();
    });

    this.addInputs(constants.registration.addressData, parentElement);
  }

  changePostalCode() {
    const postalCode = this.addressData[2];
    const selectedCountry = this.country.get().value;
    const countriesData = constants.registration.postalCodes;

    postalCode.reg = countriesData[selectedCountry as keyof typeof countriesData].reg;
    postalCode.clue.get().innerText = countriesData[selectedCountry as keyof typeof countriesData].clueText;
  }

  getCountry() {
    return this.country;
  }

  getAddressData() {
    return this.addressData;
  }
}
