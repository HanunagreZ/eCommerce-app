import Div from '../../../ui-components/Div/Div';
import Button from '../../../ui-components/Button/Button';
import userState from '../../../states/UserState';
import api from '../../../Api';
import { profile } from '../../../data/data';
import InputField from '../../../components/InputField/InputField';
import { CheckInputs } from '../../../utils/checkInputs';
import { CheckAge } from '../../../utils/checkAge';
import { FormatDate } from '../../../utils/formatDate';

class Personal {
  private container: Div;
  private form: HTMLFormElement;
  private editButton: Button;
  private cancelButton: Button;
  private saveButton: Button;
  private inputFields: InputField[] = [];
  private dateOfBirth: InputField;

  constructor() {
    this.container = new Div('profile__personal');
    this.form = document.createElement('form');
    this.form.classList.add('profile__personal-form');

    this.cancelButton = new Button('Cancel', 'personal__edit-button', this.container.get());
    this.cancelButton.addListener(() => this.cancelEdit());
    this.saveButton = new Button('Save', 'personal__edit-button', this.container.get());
    this.saveButton.addListener(() => this.saveChanges());
    this.editButton = new Button('Edit profile', 'personal__edit-button', this.container.get());
    this.editButton.addListener(() => this.renderEditMode());
    this.dateOfBirth = new InputField(profile.dateOfBirth.labelText, profile.dateOfBirth.clueText);
  }

  get() {
    return this.container.get();
  }

  render(parentElement?: HTMLElement) {
    new Div('personal__btn-container', this.container.get())
      .get()
      .append(this.editButton.get(), this.cancelButton.get(), this.saveButton.get());
    this.cancelButton.get().classList.add('hidden');
    this.saveButton.get().classList.add('hidden');

    this.container.get().append(this.form);
    this.addInputs(profile.profileGeneralData);

    this.disableInputs();

    this.dateOfBirth.render(this.form);
    FormatDate(this.dateOfBirth.input.get());
    this.updateContent();
    if (parentElement) parentElement.append(this.container.get());
  }

  validateForm() {
    let isValidForm = false;
    const isValidGeneralData = CheckInputs(this.inputFields);
    const isValidDate = this.addAgeListener();
    isValidForm = isValidGeneralData && isValidDate;
    return isValidForm;
  }

  addAgeListener(): boolean {
    const isValidAge = this.dateOfBirth.addError(CheckAge(this.dateOfBirth.input.get().value));
    this.dateOfBirth.input.removeListener(() =>
      this.dateOfBirth.addError(CheckAge(this.dateOfBirth.input.get().value)),
    );
    this.dateOfBirth.input.addListener(() => this.dateOfBirth.addError(CheckAge(this.dateOfBirth.input.get().value)));
    return isValidAge;
  }

  addInputs(data: typeof profile.profileGeneralData) {
    data.forEach((el) => {
      const field = new InputField(el.labelText, el.clueText, el.reg, this.form);
      this.inputFields.push(field);
    });
  }
  updateContent() {
    if (userState.getUserId() === null) return;
    api.getCustomerById(userState.getUserId() as string).then((data) => {
      this.inputFields[0].input.get().value = data?.data.email;
      this.inputFields[1].input.get().value = data?.data.firstName;
      this.inputFields[2].input.get().value = data?.data.lastName;
      this.dateOfBirth.input.get().value = data?.data.dateOfBirth.split('-').reverse().join('.');
    });
  }

  disableInputs() {
    this.inputFields.map((el) => {
      el.input.get().disabled = true;
      el.input.get().classList.remove('error');
      el.clue.get().classList.remove('error');
    });
    this.dateOfBirth.input.get().disabled = true;
  }

  renderEditMode() {
    this.editButton.get().classList.add('hidden');

    this.cancelButton.get().classList.remove('hidden');
    this.saveButton.get().classList.remove('hidden');

    this.inputFields.map((el) => (el.input.get().disabled = false));
    this.dateOfBirth.input.get().disabled = false;
  }

  cancelEdit() {
    this.editButton.get().classList.remove('hidden');
    this.cancelButton.get().classList.add('hidden');
    this.saveButton.get().classList.add('hidden');
    this.updateContent();
    this.disableInputs();
  }

  saveChanges() {
    if (this.validateForm()) {
      const personalData = {
        email: this.inputFields[0].input.get().value,
        firstName: this.inputFields[1].input.get().value,
        lastName: this.inputFields[2].input.get().value,
        dateOfBirth: this.dateOfBirth.input.get().value.split('.').reverse().join('-'),
      };
      console.log(personalData);

      api.changeCustomerPersonalData(personalData).then(() => {
        this.updateContent();
      });

      this.editButton.get().classList.remove('hidden');
      this.cancelButton.get().classList.add('hidden');
      this.saveButton.get().classList.add('hidden');
      this.disableInputs();
    }
  }
}

const personal = new Personal();
export default personal;
