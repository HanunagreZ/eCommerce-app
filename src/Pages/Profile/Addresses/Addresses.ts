import Div from '../../../ui-components/Div/Div';
import Button from '../../../ui-components/Button/Button';
import api from '../../../Api';
import userState from '../../../states/UserState';
import { AddressItem } from './AddressItem';

class Addresses {
  private container: Div;

  private showButton: Button;
  private addNewAddressButton: Button;
  private removeAddressButton: Button;
  private changeAddressButton: Button;
  private checkDefaultAddressButton: Button;
  private changeBillingAddressButton: Button;
  private changeShippingAddressButton: Button;

  constructor() {
    this.container = new Div('profile__addresses');

    const f = new AddressItem().render();

    this.container.get().append(f);

    this.showButton = new Button('Show addresses', 'addresses__edit-button', this.container.get());
    this.addNewAddressButton = new Button('Add new address', 'addresses__add-new-button', this.container.get());
    this.removeAddressButton = new Button('Remove address', 'addresses__remove-button', this.container.get());
    this.changeAddressButton = new Button('Change address', 'addresses__change-button', this.container.get());
    this.checkDefaultAddressButton = new Button(
      'Check default address',
      'addresses__check-default-button',
      this.container.get(),
    );
    this.changeBillingAddressButton = new Button(
      'Change billing address',
      'addresses__change-billing-button',
      this.container.get(),
    );
    this.changeShippingAddressButton = new Button(
      'Change shipping address',
      'addresses__change-shipping-button',
      this.container.get(),
    );
  }

  get() {
    return this.container.get();
  }

  render(parentElement?: HTMLElement) {
    if (parentElement) parentElement.append(this.container.get());

    this.showButton.get().addEventListener('click', () => {
      /* Собираем валидированные данные из форм и отправляем */
      api.getCustomerById(userState.getUserId() as string).then((data) => {
        const addresses = data?.data.addresses;
        for (let i = 0; i < addresses.length; i++) {
          const address = addresses[i];

          // this.container.get().append(new AddressItem().render());

          console.log(address.id, address.country, address.city, address.streetName, address.postalCode);
        }
      });
    });

    this.addNewAddressButton.get().addEventListener('click', () => {
      /* Собираем валидированные данные из форм и отправляем */

      const addressData = {
        streetName: 'Тест тестов',
        postalCode: '12312',
        city: 'ыыыыы',
        country: 'RS',
      };

      api.addNewCustomerAddress(addressData);
    });

    this.removeAddressButton.get().addEventListener('click', () => {
      /* Id адреса */
      api.removeAddressById('O5_3rlAO');
    });

    this.changeAddressButton.get().addEventListener('click', () => {
      const newAddressData = {
        streetName: '2 22',
        postalCode: '123123',
        city: 'Kursk',
        country: 'RU',
      };

      api.changeCustomerAddress(newAddressData, 'MhRIdQpW');
    });

    this.checkDefaultAddressButton.get().addEventListener('click', () => {
      api.getCustomerById(userState.getUserId() as string).then((data) => {
        console.log(data?.data.defaultBillingAddressId);
        console.log(data?.data.defaultShippingAddressId);
      });
    });

    this.changeBillingAddressButton.get().addEventListener('click', () => {
      api.setDefaultBillingAddress('O5_3rlAO');
    });

    this.changeShippingAddressButton.get().addEventListener('click', () => {
      api.setDefaultShippingAddress('MhRIdQpW');
    });
  }
}

const addresses = new Addresses();
export default addresses;
