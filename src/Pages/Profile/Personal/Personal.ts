import Div from '../../../ui-components/Div/Div';
import Button from '../../../ui-components/Button/Button';
import Span from '../../../ui-components/Span/Span';

import userState from '../../../states/UserState';
import api from '../../../Api';

class Personal {
  private container: Div;
  private editButton: Button;

  /* Заменить на поля */
  private email: Span;
  private firstName: Span;
  private lastName: Span;
  private dateOfBirth: Span;

  constructor() {
    this.container = new Div('profile__personal');
    this.editButton = new Button('Edit profile', 'personal__edit-button', this.container.get());

    this.email = new Span('f', 'personal__email', this.container.get());
    this.firstName = new Span('f', 'personal__name', this.container.get());
    this.lastName = new Span('f', 'personal__surname', this.container.get());
    this.dateOfBirth = new Span('f', 'personal__date-of-birth', this.container.get());
  }

  get() {
    return this.container.get();
  }

  render(parentElement: HTMLElement) {
    this.updateContent();
    parentElement.append(this.container.get());

    this.editButton.get().addEventListener('click', () => {
      /* Собираем валидированные данные из форм и отправляем объектом IPersonalData*/

      const personalData = {
        email: 'q@q.ru',
        firstName: '22',
        lastName: '33',
        dateOfBirth: '1990-11-08',
      };

      api.changeCustomerPersonalData(personalData).then(() => {
        this.updateContent();
      });
    });
  }

  updateContent() {
    if (userState.getUserId() === null) return;
    api.getCustomerById(userState.getUserId() as string).then((data) => {
      this.email.get().textContent = data?.data.email;
      this.firstName.get().textContent = data?.data.firstName;
      this.lastName.get().textContent = data?.data.lastName;
      this.dateOfBirth.get().textContent = data?.data.dateOfBirth;
    });
  }
}

const personal = new Personal();
export default personal;
