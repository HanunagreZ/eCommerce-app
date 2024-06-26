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
  component: HTMLElement | HTMLDivElement | Promise<HTMLDivElement>;
}

export interface IModalProps {
  icon: string;
  title: string;
  description: string;
  btn: string;
  addEvent: () => void;
  secondBtn?: string;
  addsecondEvent?: () => void;
}

export interface IProductCard {
  sku: string;
  productType: string;
  key: string;
  imgSrc: string;
  category: string;
  name: string;
  price: number;
  isInCart: boolean;
  discountedPrice?: number;
}

export interface IProductResponseData {
  productType: { id: string };
  key: string;
  categories: {
    obj: {
      name: {
        'en-US': string;
      };
    };
  }[];
  description: {
    'en-US': string;
  };
  name: {
    'en-US': string;
  };
  masterVariant: {
    sku: string;
    images: {
      url: string;
    }[];
    prices: {
      value: {
        centAmount: number;
      };
      discounted: {
        value: {
          centAmount: number;
        };
      };
    }[];
  };
}

export interface IProduct {
  key?: string;
  category: string;
  name: string;
  prices: { discounted: { value: { centAmount: number } }; value: { centAmount: number } };
  description: string;
  img: { url: string }[];
  sku: string;

  isInCart: boolean;
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
  key: string;
  name: { 'en-US': string };
  description: { 'en-US': string };
  slug: { 'en-US': string };
}

export interface IProductData {
  categories: {
    obj: {
      name: {
        'en-US': string;
      };
    };
  }[];
  description: {
    'en-US': string;
  };
  name: {
    'en-US': string;
  };
  masterVariant: {
    sku: string;
    images: {
      url: string;
    }[];
    prices: {
      value: {
        centAmount: number;
      };
      discounted: {
        value: {
          centAmount: number;
        };
      };
    }[];
  };
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

export interface IAddressData {
  id: string;
  countryCode: string;
  city: string;
  streetName: string;
  postalCode: string;
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

export interface ITypeEndpoints {
  all: string;
  pop: string;
  accessories: string;
  marvel: string;
  starwars: string;
  anime: string;
}

export interface IPerson {
  nickname: string;
  name: string;
  role: string;
  bio: string;
  github: string;
  imgUrl: string;
  icoUrl: string;
  hobbitIcoNum?: string;
}

export interface ApiLineItem {
  id: string;
  variant: { images: { url: string }[] };
  name: {
    'en-US': string;
  };
  quantity: number;
  price: {
    value: {
      centAmount: number;
    };
    discounted:
    | {
      value: {
        centAmount: number;
      };
    }
    | undefined;
  };
}

export interface CartApiData {
  lineItems: ApiLineItem[];
  totalLineItemQuantity: number;
  totalPrice: {
    centAmount: number;
  };
  discountCodes: { discountCode: { id: string } }[];
}

export interface CartItemData {
  id: string;
  imgUrl: string;
  name: string;
  quantity: number;
  price: number;
  discountedPrice?: number;
}

export interface ICartData {
  lineItems: CartItemData[];
  totalQuantity: number;
  totalPrice: number;
  promoCode: string;
}
