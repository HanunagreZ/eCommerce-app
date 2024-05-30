import Div from '../../../ui-components/Div/Div';
import Button from '../../../ui-components/Button/Button';
import { profile } from '../../../data/data';
import InputField from '../../../components/InputField/InputField';
import { CheckInputs } from '../../../utils/checkInputs';
import api from '../../../Api';
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

    this.cancelButton = new Button('Cancel', 'personal__edit-button', this.container.get());
    this.cancelButton.addListener(() => this.cancelEdit());
    this.saveButton = new Button('Save', 'personal__edit-button', this.container.get());
    this.saveButton.addListener(() => this.saveChanges());
    this.editButton = new Button('Edit profile', 'personal__edit-button', this.container.get());
    this.editButton.addListener(() => this.renderEditMode());
  }

  render(parentElement?: HTMLElement) {
    new Div('personal__btn-container', this.container.get())
      .get()
      .append(this.editButton.get(), this.cancelButton.get(), this.saveButton.get());
    this.cancelButton.get().classList.add('hidden');
    this.saveButton.get().classList.add('hidden');
    this.container.get().append(this.form);
    this.addInputs(profile.passwords);
    this.updateContent();
    this.disableInputs();
    if (parentElement) parentElement.append(this.container.get());
  }

  addInputs(data: typeof profile.passwords) {
    data.forEach((el) => {
      const field = new InputField(el.labelText, el.clueText, el.reg, this.form);
      this.inputFields.push(field);
    });
  }

  disableInputs() {
    this.inputFields.map((el) => {
      el.input.get().disabled = true;
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
    this.inputFields.map((el) => (el.input.get().disabled = false));
  }

  cancelEdit() {
    this.editButton.get().classList.remove('hidden');
    this.cancelButton.get().classList.add('hidden');
    this.saveButton.get().classList.add('hidden');
    this.disableInputs();
    this.updateContent();
  }

  saveChanges() {
    if (this.validateForm()) {
      const personalData = this.inputFields.map((el) => el.input.get().value);
      api.changeCustomerPassword(personalData);
      this.editButton.get().classList.remove('hidden');
      this.cancelButton.get().classList.add('hidden');
      this.saveButton.get().classList.add('hidden');
      this.disableInputs();
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
