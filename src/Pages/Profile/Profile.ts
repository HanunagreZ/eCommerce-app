import Div from '../../ui-components/Div/Div';
import selectionPanel from './SelectionPanel/SelectionPanel';
import './Profile.scss';

export default class Profile {
  private container: Div;

  constructor() {
    this.container = new Div('profile');
  }

  render() {
    selectionPanel.render(this.container.get());
    return this.container.get();
  }
}
