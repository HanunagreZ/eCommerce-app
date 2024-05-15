export interface IRegistrationData {
  labelText: string;
  clueText: string;
  reg: RegExp;
}

export interface ICustomerRegistration {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: IAddress[];
  defaultShippingAddress: number;
  shippingAddresses: number[];
  defaultBillingAddress: number;
  billingAddresses: number[];
}

interface IAddress {
  country: string;
  streetName: string;
  postalCode: string;
  city: string;
}

export interface IRoute {
  path: string;
  component: HTMLElement;
}

export interface IModalProps {
  icon: string;
  title: string;
  description: string;
  btn: string;
  addEvent: () => void;
}
