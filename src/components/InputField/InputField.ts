import './InputField.scss';
import Div from '../ui-components/Div/Div';
import Input from '../ui-components/Input/Input';
import Label from '../ui-components/Label/Label';

export default class InputField {
  private container: Div;
  private label: Label;
  private input: Input;
  private clue: Div;

  constructor(parentElement: HTMLElement, labelText: string, clueText: string) {
    this.container = new Div('input-field', parentElement);
    this.label = new Label(labelText, 'input-field-label', this.container.get());
    this.input = new Input('', 'input-field-input', this.container.get());
    this.clue = new Div('input-field-clue', this.container.get());
    this.clue.get().innerText = clueText;
  }
}
