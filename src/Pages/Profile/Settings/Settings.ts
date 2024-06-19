import Div from '../../../ui-components/Div/Div';
import Button from '../../../ui-components/Button/Button';
import { profile } from '../../../data/data';
import InputField from '../../../components/InputField/InputField';
import { CheckInputs } from '../../../utils/checkInputs';
import api from '../../../api/Api';
import userState from '../../../states/UserState';

class Settings {
  private container: Div;
  private form: HTMLFormElement;
  private editButton: Button;
  private cancelButton: Button;
  private saveButton: Button;
  private inputFields: InputField[] = [];

  constructor() {
    this.container = new Div('profile__settings');
    this.form = document.createElement('form');
    this.form.classList.add('profile__settings-form');

    this.cancelButton = new Button('Cancel', 'addresses__btn', this.container.get());
    this.cancelButton.addListener(() => this.cancelEdit());
    this.saveButton = new Button('Save', 'addresses__btn', this.container.get());
    this.saveButton.addListener(() => this.saveChanges());
    this.editButton = new Button('Change password', 'addresses__btn', this.container.get());
    this.editButton.addListener(() => this.renderEditMode());
  }

  render(parentElement?: HTMLElement) {
    new Div('addresses__btn-container', this.container.get())
      .get()
      .append(this.editButton.get(), this.cancelButton.get(), this.saveButton.get());
    this.cancelButton.get().classList.add('hidden');
    this.saveButton.get().classList.add('hidden');
    this.container.get().append(this.form);
    this.addInputs(profile.passwords);
    this.inputFields.map((el) => el.get().classList.add('hidden'));
    this.updateContent();
    this.removeErrorVisibility();
    if (parentElement) parentElement.append(this.container.get());
  }

  addInputs(data: typeof profile.passwords) {
    data.forEach((el) => {
      const field = new InputField(el.labelText, el.clueText, el.reg, this.form);
      this.inputFields.push(field);
    });
  }

  removeErrorVisibility() {
    this.inputFields.map((el) => {
      el.input.get().classList.remove('error');
      el.clue.get().classList.remove('error');
    });
  }

  validateForm() {
    const isValidForm = CheckInputs(this.inputFields);
    return isValidForm;
  }

  get() {
    return this.container.get();
  }

  renderEditMode() {
    this.editButton.get().classList.add('hidden');
    this.cancelButton.get().classList.remove('hidden');
    this.saveButton.get().classList.remove('hidden');
    this.inputFields.map((el) => el.get().classList.remove('hidden'));
  }

  cancelEdit() {
    this.editButton.get().classList.remove('hidden');
    this.cancelButton.get().classList.add('hidden');
    this.saveButton.get().classList.add('hidden');
    this.removeErrorVisibility();
    this.updateContent();
    this.inputFields.map((el) => el.get().classList.add('hidden'));
  }

  saveChanges() {
    if (this.validateForm()) {
      const personalData = this.inputFields.map((el) => el.input.get().value);
      api.changeCustomerPassword(personalData);
      this.editButton.get().classList.remove('hidden');
      this.cancelButton.get().classList.add('hidden');
      this.saveButton.get().classList.add('hidden');
      this.inputFields.map((el) => el.get().classList.add('hidden'));
      this.removeErrorVisibility();
    }
    this.updateContent();
  }

  updateContent() {
    if (userState.getUserId() === null) return;
    this.inputFields.map((el) => (el.input.get().value = ''));
  }
}

const settings = new Settings();
export default settings;
