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
  defaultShippingAddress: number | null;
  shippingAddresses: number[];
  defaultBillingAddress: number | null;
  billingAddresses: number[];
}

export interface ICustomerLogin {
  email: string;
  password: string;
}

export interface IAddress {
  country: string;
  streetName: string;
  postalCode: string;
  city: string;
}

export interface IRoute {
  path: string;
  component: HTMLElement | HTMLDivElement;
}

export interface IModalProps {
  icon: string;
  title: string;
  description: string;
  btn: string;
  addEvent: () => void;
}

export interface IProductCard {
  imgSrc: string;
  category: string;
  name: string;
  price: number;
  discountedPrice?: number;
}
export interface IProductResponseData {
  masterData: {
    current: {
      masterVariant: {
        prices: { discounted: { value: { centAmount: number } }; value: { centAmount: number } }[];
        images: { url: string }[];
      };
      categories: { id: string }[];
      name: { [x: string]: string };
    };
  };
}

export interface IFilteredProductResponseData {
  masterVariant: {
    prices: { discounted: { value: { centAmount: number } }; value: { centAmount: number } }[];
    images: { url: string }[];
  };
  categories: { id: string }[];
  name: { [x: string]: string };
}

export interface ProductInfo {
  category: string;
  header: string;
  price: string;
  description: string;
  imgUrl: string;
}

export interface Product {
  categories: {
    id: string;
    obj: {
      ancestors: {
        id: string;
        obj: {
          slug: {
            'en-US': string;
          };
          orderHint: number;
        };
      }[];
      name: { 'en-US': string };
      slug: {
        'en-US': string;
      };

      orderHint: number;
    };
  }[];
  masterVariant: {
    images: { url: string }[];
  };
  name: { 'en-US': string };
  description: { 'en-US': string };
  slug: { 'en-US': string };
}

export interface IMainAdBlockProps {
  containerClass: string;
  image: string;
  imageClass: string;
  blockClass: string;
  title: string;
  description: string;
  btn: string;
  addEvent: () => void;
}

export interface IBreadcrumbsProps {
  href: string[];
  text: string[];
}

export interface IUserData {
  customer: {
    id: string;
    version: number;
    versionModifiedAt: string;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    password: string;
    addresses: [];
  };
}

export interface IPersonalData {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

// export interface ICountryCode {
//   US: string;
//   CA: string;
// }

export interface IAddressData {
  id: string;
  countryCode: string;
  city: string;
  streetName: string;
  postalCode: string;
  //типы адресов: billing или shipping
  //isBillingAddress: boolean;
  //isShippingAddress: boolean;
  isDefaultBilling?: boolean;
  isDefaultShipping?: boolean;
}

export interface IEmptyAddressData {
  countryCode: string;
  city: '';
  streetName: '';
  postalCode: '';
  isDefaultBilling: false;
  isDefaultShipping: false;
}
