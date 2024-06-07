import './Cart.scss';
import Div from '../../ui-components/Div/Div';
import Button from '../../ui-components/Button/Button';
import api from '../../Api';
import userState from '../../states/UserState';

export class Cart {
  private container: Div;

  constructor() {
    this.container = new Div('basket');
  }

  render() {
    // кнопки для тестирования
    new Button('Get Cart by ID', 'cart', this.container.get()).addListener(async () => {
      const id = userState.getAnonymousCartId()
        ? String(userState.getAnonymousCartId())
        : String(userState.getCustomerCartId());
      console.log(id);
      const response = await api.getCartByID(id);
      console.log(response);
    });

    new Button('addDiscountCode', 'cart', this.container.get()).addListener(async () => {
      const response = await api.addDiscountCode(
        String(userState.getAnonymousCartId()),
        Number(userState.getAnonymousCartVersion()),
        'FUNKOALL5',
      );
      console.log(response);
    });

    return this.container.get();
  }
}
