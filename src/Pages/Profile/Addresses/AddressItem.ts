import Div from '../../../ui-components/Div/Div';
import Input from '../../../ui-components/Input/Input';
import Label from '../../../ui-components/Label/Label';
import Address from '../../Registration/Address';

export class AddressItem {
  private form: HTMLFormElement;
  private shipAddrCheck: Input;
  private billAddrCheck: Input;
  private addressFields: Address;

  constructor() {
    this.form = document.createElement('form');
    this.form.classList.add('address__form');
    this.shipAddrCheck = new Input('', 'registration__address_checkbox');
    this.billAddrCheck = new Input('', 'registration__address_checkbox');
    this.addressFields = new Address();

    // new Address(this.form);
  }

  createCheckbox(chekbox: HTMLInputElement, id: string, labelText: string) {
    chekbox.setAttribute('type', 'checkbox');
    chekbox.setAttribute('id', id);
    const label = new Label(labelText, 'registration__address_label').get();
    label.setAttribute('for', id);
    return { chekbox, label };
  }

  render() {
    const defaultWrapper = new Div('registration__address_title', this.form);
    // new Span(constants.registration.shippingAddr, 'registration__address', shippingAddressWrapper.get());
    const shippingCheck = this.createCheckbox(this.shipAddrCheck.get(), 'shipping_address', 'Default shipping address');
    const billingCheck = this.createCheckbox(this.billAddrCheck.get(), 'billing_address', 'Default billing address');

    [shippingCheck, billingCheck].map((el) => {
      new Div('address__default-wrapper', defaultWrapper.get()).get().append(el.chekbox, el.label);
    });

    this.form.append(defaultWrapper.get());

    this.addressFields.render(this.form);
    return this.form;
  }
}
