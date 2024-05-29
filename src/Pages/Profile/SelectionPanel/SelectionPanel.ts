import Div from '../../../ui-components/Div/Div';
import Span from '../../../ui-components/Span/Span';
import Img from '../../../ui-components/Img/Img';

import userState from '../../../states/UserState';

class SelectionPanel {
  private container: Div;
  private title: Span;
  private selectionPanel: Div;
  private imageDiv: Div;
  private imageTextDiv: Div;
  private profileImage: Img;
  private greeting: Span;
  private profileName: Span;
  private personalDiv: Div;
  private personalTitle: Span;
  private personalImg: Img;
  private addressDiv: Div;
  private addressTitle: Span;
  private addressImg: Img;
  private settingsDiv: Div;
  private settingsTitle: Span;
  private settingsImg: Img;

  constructor() {
    this.container = new Div('profile__selection-panel-wrapper');
    this.title = new Span('My profile', 'profile__selection-title', this.container.get());
    this.selectionPanel = new Div('profile__selection-panel', this.container.get());

    this.imageDiv = new Div('profile__image-div', this.selectionPanel.get());
    this.profileImage = new Img(
      'profile__image',
      'assets/profile/profileAvatar.svg',
      'profile-avatar',
      this.imageDiv.get(),
    );
    this.imageTextDiv = new Div('profile__image-div-text', this.imageDiv.get());
    this.greeting = new Span('Hello! ⭐', 'profile__greeting', this.imageTextDiv.get());
    this.profileName = new Span(String(userState.getUserName()), 'profile__name', this.imageTextDiv.get());

    this.personalDiv = new Div('profile__personal', this.selectionPanel.get());
    this.personalDiv.get().classList.add('profile__personal_active');

    this.personalImg = new Img(
      'profile__personal-img',
      'assets/profile/iconProfile.svg',
      'personal-icon',
      this.personalDiv.get(),
    );
    this.personalTitle = new Span('Personal Information', 'profile__personal-title', this.personalDiv.get());

    this.addressDiv = new Div('profile__address', this.selectionPanel.get());
    this.addressImg = new Img(
      'profile__address-img',
      'assets/profile/iconPen.svg',
      'address-icon',
      this.addressDiv.get(),
    );
    this.addressTitle = new Span('Manage Addresses', 'profile__address-title', this.addressDiv.get());

    this.settingsDiv = new Div('profile__settings', this.selectionPanel.get());
    this.settingsImg = new Img(
      'profile__settings-img',
      'assets/profile/iconLock.svg',
      'settings-icon',
      this.settingsDiv.get(),
    );
    this.settingsTitle = new Span('Settings', 'profile__settings-title', this.settingsDiv.get());
  }

  get() {
    return this.container.get();
  }

  render(parentElement: HTMLElement) {
    this.personalDiv.get().addEventListener('click', () => {
      this.personalDiv.get().classList.add('profile__personal_active');
      this.addressDiv.get().classList.remove('profile__address_active');
      this.settingsDiv.get().classList.remove('profile__settings_active');
    });

    this.addressDiv.get().addEventListener('click', () => {
      this.addressDiv.get().classList.add('profile__address_active');
      this.personalDiv.get().classList.remove('profile__personal_active');
      this.settingsDiv.get().classList.remove('profile__settings_active');
    });

    this.settingsDiv.get().addEventListener('click', () => {
      this.settingsDiv.get().classList.add('profile__settings_active');
      this.personalDiv.get().classList.remove('profile__personal_active');
      this.addressDiv.get().classList.remove('profile__address_active');
    });

    parentElement.append(this.get());
  }
}

const selectionPanel = new SelectionPanel();
export default selectionPanel;
