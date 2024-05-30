import Div from '../../../ui-components/Div/Div';
import Button from '../../../ui-components/Button/Button';
import Span from '../../../ui-components/Span/Span';
import api from '../../../Api';

class Settings {
  private container: Div;
  private editButton: Button;

  /* Заменить на инпуты */
  private oldPassword: Span;
  private newPassword: Span;

  constructor() {
    this.container = new Div('profile__settings');
    this.editButton = new Button('Edit password', 'settings__edit-button', this.container.get());

    this.oldPassword = new Span('Старый пароль', 'settings__old-password', this.container.get());
    this.newPassword = new Span('Новый пароль', 'settings__new-password', this.container.get());
  }

  get() {
    return this.container.get();
  }

  render(parentElement: HTMLElement) {
    parentElement.append(this.container.get());

    this.editButton.get().addEventListener('click', () => {
      /* Функция для привязки на кнопку сохранить после изменения пароля. Собираем валидированные данные из форм и отправляем */

      const personalData = ['1Qqqqqqq', '2Qqqqqqq'];

      api.changeCustomerPassword(personalData);
    });
  }
}

const settings = new Settings();
export default settings;
