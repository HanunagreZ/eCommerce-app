import api from '../../../Api';
import { profile } from '../../../data/data';
import { IAddressData } from '../../../interfaces/interfaces';
import Button from '../../../ui-components/Button/Button';
import Div from '../../../ui-components/Div/Div';
import Input from '../../../ui-components/Input/Input';
import Label from '../../../ui-components/Label/Label';
import { CheckInputs } from '../../../utils/checkInputs';
import Address from '../../Registration/Address';
import addresses from './Addresses';

export class AddressItem {
  private form: HTMLFormElement;
  private defaultBillAddrCheck: Input;
  private defaultShipAddrCheck: Input;
  private editButton: Button;
  private removeButton: Button;
  private cancelButton: Button;
  private saveButton: Button;
  private addressFields: Address;
  public addressData: IAddressData;

  constructor(addressData: IAddressData) {
    this.form = document.createElement('form');
    this.form.classList.add('address__form');
    this.defaultBillAddrCheck = new Input('', 'registration__address_checkbox');
    this.defaultShipAddrCheck = new Input('', 'registration__address_checkbox');

    this.editButton = new Button('', 'address__edit-btn');
    this.editButton.addListener((e) => this.renderEditMode(e));
    this.removeButton = new Button('', 'address__remove-btn');
    this.removeButton.addListener(async (e) => {
      await this.removeAddress(e);
    });

    this.cancelButton = new Button('Cancel', 'addresses__btn');
    this.cancelButton.addListener((e) => this.cancelEdit(e));
    this.saveButton = new Button('Save', 'addresses__btn');
    this.saveButton.get().addEventListener('click', async (e) => {
      await this.saveChanges(e);
    });

    this.addressFields = new Address();
    this.addressData = addressData;
  }

  render() {
    const addressHeader = new Div('address__header', this.form);
    const checkboxWrapper = new Div('address__default-container', this.form);

    const defaultBilling = this.createCheckbox(
      this.defaultBillAddrCheck.get(),
      'default_billing_address',
      'Default billing address',
    );
    const defaultShipping = this.createCheckbox(
      this.defaultShipAddrCheck.get(),
      'default_shipping_address',
      'Default shipping address',
    );

    [defaultBilling, defaultShipping].map((el) => {
      new Div('address__default-wrapper', checkboxWrapper.get()).get().append(el.chekbox, el.label);
    });

    const btnContainer = new Div('addresses__btn-container');
    this.cancelButton.get().classList.add('hidden');
    this.saveButton.get().classList.add('hidden');
    btnContainer
      .get()
      .append(this.editButton.get(), this.removeButton.get(), this.cancelButton.get(), this.saveButton.get());

    addressHeader.get().append(btnContainer.get(), checkboxWrapper.get());

    this.addressFields.render(new Div('address__body', this.form).get());
    this.fillInputs(this.addressData);

    this.disableInputsMode(true);
    return this.form;
  }

  createCheckbox(chekbox: HTMLInputElement, id: string, labelText: string) {
    chekbox.setAttribute('type', 'checkbox');
    chekbox.setAttribute('id', `${id}_${this.addressData.id}`);
    const label = new Label(labelText, 'registration__address_label').get();
    label.setAttribute('for', `${id}_${this.addressData.id}`);
    return { chekbox, label };
  }

  fillInputs(addressData: IAddressData) {
    this.defaultBillAddrCheck.get().checked = this.addressData.isDefaultBilling
      ? this.addressData.isDefaultBilling
      : false;
    this.defaultShipAddrCheck.get().checked = this.addressData.isDefaultShipping
      ? this.addressData.isDefaultShipping
      : false;

    this.addressFields.getCountry().get().value =
      profile.countries[addressData.countryCode as keyof typeof profile.countries];

    this.addressFields.getAddressData()[0].input.get().value = addressData.city;
    this.addressFields.getAddressData()[1].input.get().value = addressData.streetName;
    this.addressFields.getAddressData()[2].input.get().value = addressData.postalCode;
  }

  disableInputsMode(isDisableInputs: boolean) {
    this.defaultBillAddrCheck.get().disabled = isDisableInputs;
    this.defaultShipAddrCheck.get().disabled = isDisableInputs;
    this.addressFields.getCountry().get().disabled = isDisableInputs;
    this.addressFields.getAddressData().map((el) => {
      el.input.get().disabled = isDisableInputs;
      el.input.get().classList.remove('error');
      el.clue.get().classList.remove('error');
    });
  }

  renderEditMode(e: Event | undefined) {
    e?.preventDefault();
    this.addressFields.changePostalCode();
    this.editButton.get().classList.add('hidden');
    this.removeButton.get().classList.add('hidden');

    this.cancelButton.get().classList.remove('hidden');
    this.saveButton.get().classList.remove('hidden');
    this.disableInputsMode(false);
    console.log('edit mode');
  }

  renderDisableMode(e: Event | undefined) {
    e?.preventDefault();
    this.editButton.get().classList.remove('hidden');
    this.removeButton.get().classList.remove('hidden');

    this.cancelButton.get().classList.add('hidden');
    this.saveButton.get().classList.add('hidden');
    this.disableInputsMode(true);
  }

  cancelEdit(e: Event | undefined) {
    this.fillInputs(this.addressData);
    this.renderDisableMode(e);
  }

  validateForm() {
    const isValidForm = CheckInputs(this.addressFields.getAddressData());
    return isValidForm;
  }

  async saveChanges(e: Event | undefined) {
    e?.preventDefault();
    if (this.validateForm()) {
      const newAddressData = this.formAddressData();

      await this.setDefaultAddresses();

      await api.changeCustomerAddress(newAddressData, this.addressData.id);

      this.renderDisableMode(e);
      await addresses.updateContent();
    }
  }

  async removeAddress(e: Event | undefined) {
    e?.preventDefault();
    await api.removeAddressById(this.addressData.id);

    addresses.updateContent();
  }

  formAddressData() {
    const country = this.addressFields.getCountry().get().value;
    const textData = this.addressFields.getAddressData().map((el) => el.input.get().value);
    this.addressData.countryCode = profile.countrCodes[country as keyof typeof profile.countrCodes];
    this.addressData.city = textData[0];
    this.addressData.streetName = textData[1];
    this.addressData.postalCode = textData[2];
    const newAddressData = {
      streetName: this.addressData.streetName,
      postalCode: this.addressData.postalCode,
      city: this.addressData.city,
      country: this.addressData.countryCode,
    };
    return newAddressData;
  }

  async setDefaultAddresses() {
    if (
      this.defaultBillAddrCheck.get().checked !== this.addressData.isDefaultBilling &&
      this.defaultBillAddrCheck.get().checked
    ) {
      await api.setDefaultBillingAddress(this.addressData.id);
      addresses.updateContent();
    }
    if (
      this.defaultShipAddrCheck.get().checked !== this.addressData.isDefaultShipping &&
      this.defaultShipAddrCheck.get().checked
    ) {
      await api.setDefaultShippingAddress(this.addressData.id);
      addresses.updateContent();
    }
  }

  removeForm() {
    this.form.innerHTML = '';
  }
}
