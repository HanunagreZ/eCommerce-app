import './Cart.scss';
import Div from '../../ui-components/Div/Div';
import Button from '../../ui-components/Button/Button';
import api from '../../Api';
import userState from '../../states/UserState';
// import userState from '../../states/UserState';

export class Cart {
  private container: Div;

  constructor() {
    this.container = new Div('basket');
  }

  render() {
    // new Button('Get Anon Token', 'cart', this.container.get()).addListener(async () => {
    //   const response = await api.getAnonimousToken();
    //   console.log(response);
    // });

    // new Button('Create Cart', 'cart', this.container.get()).addListener(async () => {
    //   const response = await api.createCart();
    //   console.log(response);
    // });

    // new Button('Query Cart', 'cart', this.container.get()).addListener(async () => {
    //   const response = await api.queryCarts();
    //   console.log(response);
    // });

    // new Button('Create My Cart', 'cart', this.container.get()).addListener(async () => {
    //   const response = await api.createMyCart();
    //   console.log(response);
    // });

    // new Button('Query My Cart', 'cart', this.container.get()).addListener(async () => {
    //   const response = await api.queryMyCarts();
    //   console.log(response);
    // });

    new Button('Get Cart by ID', 'cart', this.container.get()).addListener(async () => {
      const id = userState.getAnonymousCartId()
        ? String(userState.getAnonymousCartId())
        : String(userState.getCustomerCartId());
      console.log(id);
      const response = await api.getCartByID(id);
      console.log(response);
    });

    // new Button('addLineItem', 'cart', this.container.get()).addListener(async () => {
    //   // const cID = 2747f79b-100e-4435-8c89-6953d9eb5536

    //   const response = await api.addLineItem('2747f79b-100e-4435-8c89-6953d9eb5536', 13, 'padawan', 1);
    //   console.log(response);
    // });

    new Button('addDiscountCode', 'cart', this.container.get()).addListener(async () => {
      // const cID = 2747f79b-100e-4435-8c89-6953d9eb5536

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
