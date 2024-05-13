import './InputField.scss';
import Div from '../../ui-components/Div/Div';
import Input from '../../ui-components/Input/Input';
import Label from '../../ui-components/Label/Label';

export default class InputField {
  private container: Div;
  private label: Label;
  public clue: Div;
  public input: Input;
  public reg: RegExp;

  constructor(labelText: string, clueText: string, reg?: RegExp, parentElement?: HTMLElement) {
    this.container = new Div('input-field');
    this.label = new Label(labelText, 'input-field-label');
    this.input = new Input('', 'input-field-input');
    this.reg = reg ? reg : /./s;
    this.clue = new Div('input-field-clue');
    this.clue.get().innerText = clueText;
    if (parentElement) this.render(parentElement);
  }

  render(parentElement: HTMLElement) {
    this.label.render(this.container.get());
    this.input.render(this.container.get());
    this.clue.render(this.container.get());

    this.container.render(parentElement);
  }

  checkValidation(reg: RegExp): boolean {
    const isValid = reg.test(this.input.get().value);
    return this.addError(isValid);
  }

  addError(validation: boolean): boolean {
    if (!validation) {
      this.input.get().classList.add('error');
      this.clue.get().classList.add('error');
      return false;
    } else {
      this.input.get().classList.remove('error');
      this.clue.get().classList.remove('error');
      return true;
    }
  }
}
