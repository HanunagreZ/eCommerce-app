import './InputField.scss';
import Div from '../../ui-components/Div/Div';
import Input from '../../ui-components/Input/Input';
import Label from '../../ui-components/Label/Label';

export default class InputField {
  private container: Div;
  private label: Label;
  public input: Input;
  public reg: RegExp;
  private clue: Div;

  constructor(parentElement: HTMLElement, labelText: string, clueText: string, reg: RegExp) {
    this.container = new Div('input-field', parentElement);
    this.label = new Label(labelText, 'input-field-label', this.container.get());
    this.input = new Input('', 'input-field-input', this.container.get());
    this.reg = reg;
    this.clue = new Div('input-field-clue', this.container.get());
    this.clue.get().innerText = clueText;
  }
  checkValidation(reg: RegExp) {
    const isValid = reg.test(this.input.get().value);
    if (!isValid) {
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
