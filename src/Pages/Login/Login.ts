import './Login.scss';
import InputField from '../../components/InputField/InputField';
import { constants } from '../../data/data';
import { IRegistrationData } from '../../interfaces/interfaces';
import Div from '../../ui-components/Div/Div';
import Span from '../../ui-components/Span/Span';
import Button from '../../ui-components/Button/Button';
import Link from '../../ui-components/Link/Link';
import { CheckInputs } from '../../utils/checkInputs';
import api from '../../Api';
import userState from '../../states/UserState';
import { CopyAnonItems } from '../../utils/CopyAnonItems';
import basket from '../../components/Header/Basket/Basket';

export default class Login {
  private form: HTMLFormElement;
  private inputFields: InputField[] = [];
  private button: Button;
  constructor() {
    this.form = document.createElement('form');
    this.form.classList.add('login__form');
    this.button = new Button(constants.login.buttonTitle, 'button');
    this.button.addListener(async (e) => this.login(e));
  }

  addInputs(data: IRegistrationData[]) {
    data.forEach((el) => {
      const field = new InputField(el.labelText, el.clueText, el.reg, this.form);
      this.inputFields.push(field);
    });
  }

  render() {
    const formWrapper = new Div('login__wrapper');
    new Span(constants.login.formTitle, 'login__title', this.form);
    const haveAccount = new Div('login__navigate-to-reg', this.form);
    haveAccount.get().innerText = constants.registration.haveAccount;
    new Link('/registration', constants.login.regLink, haveAccount.get());

    this.addInputs(constants.login.generalData);

    const passwordField = this.inputFields[1];
    passwordField.input.get().setAttribute('type', 'password');
    passwordField.get().classList.add('login__pasword_field');
    const passworViewBtn = new Div('login__password_view_btn', passwordField.get());
    passworViewBtn.get().addEventListener('click', () => {
      passworViewBtn.get().classList.toggle('visible');
      if (passworViewBtn.get().classList.contains('visible')) {
        passwordField.input.get().setAttribute('type', 'text');
      } else {
        passwordField.input.get().setAttribute('type', 'password');
      }
    });
    this.button.render(this.form);

    formWrapper.get().append(this.form);
    return formWrapper.get();
  }

  async login(e: Event | undefined) {
    e?.preventDefault();
    let isValidForm = false;
    isValidForm = CheckInputs(this.inputFields);
    if (isValidForm) {
      const inputValues = this.inputFields?.map((el) => el.input.get().value);

      const payload = {
        email: inputValues[0],
        password: inputValues[1],
      };

      await api.login(payload);
      this.inputFields?.map((el) => (el.input.get().value = ''));

      await this.createCart();
    }
  }

  async createCart() {
    //получаем корзину зарегистрированного пользователя
    const cart = await api.getCartByCustomerId();
    basket.reRenderCount(cart.totalLineItemQuantity);
    userState.setCustomerCartId(cart.id);
    userState.setCustomerCartVersion(cart.version);

    await CopyAnonItems(cart.id);
  }
}
