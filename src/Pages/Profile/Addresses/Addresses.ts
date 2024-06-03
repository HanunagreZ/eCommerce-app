import Div from '../../../ui-components/Div/Div';
import Button from '../../../ui-components/Button/Button';
import api from '../../../Api';
import userState from '../../../states/UserState';
import { AddressItem } from './AddressItem';
import { IAddressData } from '../../../interfaces/interfaces';
import { profile } from '../../../data/data';
import Span from '../../../ui-components/Span/Span';

class Addresses {
  private container: Div;
  private addressContainer: Div;
  private addNewAddressButton: Button;
  private addressTitle: Span;

  constructor() {
    this.container = new Div('profile__addresses');
    this.addressTitle = new Span(profile.addressesTitle, 'addresses__title', this.container.get());
    this.addressContainer = new Div('addresses__addresses-container', this.container.get());
    this.addNewAddressButton = new Button('Add new address', 'addresses__btn', this.container.get());
  }

  get() {
    return this.container.get();
  }

  render(parentElement?: HTMLElement) {
    this.updateContent();
    if (parentElement) parentElement.append(this.container.get());
    this.addNewAddressButton.get().addEventListener('click', async () => {
      await this.addNewAddress();
    });
  }

  async updateContent() {
    this.addressContainer.get().innerHTML = '';
    await this.showAddresses();
  }

  async showAddresses() {
    if (userState.getUserId !== null) {
      await api.getCustomerById(userState.getUserId() as string).then((data) => {
        const addresses = data?.data.addresses;
        let defaultBillingAddressId = '';
        let defaultShippingAddressId = '';
        if (data?.data.defaultBillingAddressId) defaultBillingAddressId = data?.data.defaultBillingAddressId;
        if (data?.data.defaultShippingAddressId) defaultShippingAddressId = data?.data.defaultShippingAddressId;
        for (let i = 0; i < addresses.length; i++) {
          const address = addresses[i];
          const addressData: IAddressData = {
            id: address.id,
            countryCode: address.country,
            city: address.city,
            streetName: address.streetName,
            postalCode: address.postalCode,
            isDefaultBilling: address.id === defaultBillingAddressId,
            isDefaultShipping: address.id === defaultShippingAddressId,
          };
          const newAddress = new AddressItem(addressData);
          this.addressContainer.get().append(newAddress.render());
        }
      });
    }
  }

  async addNewAddress() {
    const emptyAddressData: IAddressData = {
      id: '1',
      countryCode: profile.countrCodes['United States of America'],
      city: '',
      streetName: '',
      postalCode: '',
      isDefaultBilling: false,
      isDefaultShipping: false,
    };
    const newAddress = new AddressItem(emptyAddressData);
    this.addressContainer.get().append(newAddress.render());
    newAddress.renderEditMode(undefined);
    newAddress.cancelEdit = function (e: Event | undefined) {
      e?.preventDefault();
      newAddress.removeForm();
    };

    newAddress.saveChanges = async function (e: Event | undefined) {
      e?.preventDefault();
      if (newAddress.validateForm()) {
        await newAddress.setDefaultAddresses();
        await api.addNewCustomerAddress(newAddress.formAddressData());
        newAddress.renderDisableMode(e);
      }
    };
  }
}

const addresses = new Addresses();
export default addresses;
