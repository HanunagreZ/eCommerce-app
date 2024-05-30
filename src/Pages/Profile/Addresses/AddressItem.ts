import Address from '../../Registration/Address';

export class AddressItem {
  private form: HTMLFormElement;
  constructor() {
    this.form = document.createElement('form');
    this.form.classList.add('address__form');
    new Address(this.form);
  }

  render() {
    return this.form;
  }
}
